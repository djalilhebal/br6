const {isBraille, toBraille, MAP} = require('./symbols');

/**
 * Convert English text to UEB
 * 
 * @param {string} str - Text in English alphabet
 * @returns {string}
 */
function toBrailleText(str) {
  const normalized = normalize(str);
  const step1 = doNumerals(normalized);
  const step2 = doCapitals(step1);
  const step3 = doCharacters(step2);
  return step3;
}

/**
 * Normalize the string by turning dumb quotes to smart ones
 *   and replacing unsupported characters.
 * 
 * @param {string} str
 * @returns {string}
 */
function normalize(str = '') {
  const rUnsupported = /[^a-z\d\s!.,:;“”-]/ig;
  return doQuotes(str).replace(/\s/g, ' ').trim().replace(rUnsupported, '-');
}

/**
 * UEB uses curly quotation marks, straight ones need to be replaced.
 * @example
 * doQuotes(`"Amazing!" he said, "now, let's go..."`)
 * // `“Amazing!” he said, “now, let's go...”`
 * 
 * @param {string} str
 * @returns {string}
 */
function doQuotes(str) {
  return str
    .replace(/(\s)"/g, '$1\u201c') // OPEN after whitespace
    .replace(/(\()"/g, '$1\u201c') // OPEN after parens
    .replace(/(.)"/g, '$1\u201d') // CLOSE after any character
    .replace(/"/g, '\u201c'); // OPEN the remaining
}

/**
 * Insert NUMERIC indicators and convert numbers to Braille symboles
 * 
 * @example
 * doNumerals("it feels like 666!") === "it feels like ⠼⠋⠋⠋!"
 * @param {string} str
 * @returns {string}
 */
function doNumerals(str) {
  // matches the following: "2018" "3.14" "2,381,741"
  const rNumber = /[0-9]+[,0-9]*(\.[0-9]+)?/g;
  return str.replace(rNumber, (m) => {
    return MAP.indicator.numeric +
      m.split('').map(c => toBraille(c, ['number', 'punctuation'])).join('');
  });
}

/**
 * Insert CAPITAL indicators and terminators then lowercase everything
 *
 * - "ALICE IN WONDERLAND is a novel by Lewis CARROLL"
 * - "⠠⠠⠠alice in wonderland⠠⠄ is a novel by Lewis CARROLL"
 * - "⠠⠠⠠alice in wonderland⠠⠄ is a novel by Lewis ⠠⠠carroll"
 * - "⠠⠠⠠alice in wonderland⠠⠄ is a novel by ⠠lewis ⠠⠠carroll"
 * 
 * @param {string} str
 * @returns {string}
 */
function doCapitals(str) {
  // Regexes to match capitalized passages, words, and single letters
  const rCapPassage = /[A-Z]+(\s+[A-Z]+)+/g;
  const rCapWord = /\b[A-Z]{2,}\b/g;
  const rCapLetter = /[A-Z]/g;

  return str
    .replace(rCapPassage, m => `⠠⠠⠠${m.toLowerCase()}⠠⠄`)
    .replace(rCapWord, m => `⠠⠠${m.toLowerCase()}`)
    .replace(rCapLetter, m => `⠠${m.toLowerCase()}`);
}

function doCharacters(str) {
  return str.split('')
    .map(c => isBraille(c) ? c : toBraille(c, ['alpha', 'punctuation'])).join('');
}

module.exports = toBrailleText;
