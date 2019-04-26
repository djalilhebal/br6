const {toAlphabet} = require('./symbols');

/**
 * Translate Braille back to English alphabet.
 * 
 * @param {string} str
 * @returns {string}
 */
function toAlphabetText(str = '') {
  const step1 = undoNumerals(str);
  const step2 = undoCharacters(step1);
  const step3 = undoCapitals(step2);
  // Convert the remaining Braille symbols to '?'
  const step4 = step3.replace(/[\u2800-\u28FF]/g, '?');
  return step4;
}

/**
 * Convert Braille numbers to "alphabet" numbers
 * @example
 * undoNumerals("it feels like ⠼⠋⠋⠋!") === "it feels like 666!"
 * 
 * @todo Handle '.' and ','
 * @todo It's repetitive, simplify it
 * 
 * @param {string} str
 * @returns {string}
 */
function undoNumerals(str) {
  const rNumber = /⠼[⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠂⠲]+/g;

  return str.replace(rNumber, (m) => {
    // remove the NUMERIC indicator then translate
    return m.slice(1).split('').map(c => toAlphabet(c, ['number'])).join('')
  });
}

/**
 * Remove CAPITAL indicators and uppercase parts of text
 *
 * - "⠠⠠⠠alice in wonderland⠠⠄ is a novel by ⠠lewis ⠠⠠carroll"
 * - "ALICE IN WONDERLAND is a novel by ⠠lewis ⠠⠠carroll"
 * - "ALICE IN WONDERLAND is a novel by ⠠lewis CARROLL"
 * - "ALICE IN WONDERLAND is a novel by Lewis CARROLL"
 * 
 * @param {string} str
 * @returns {string}
 */
function undoCapitals(str) {
  // regexes to matche capitalized passages, words, letters
  const rCapPassage = /⠠⠠⠠[\w\W]+?⠠⠄/g;
  const rCapWord = /⠠⠠[a-z]+/g;
  const rCapLetter = /⠠[a-z]/g;

  return str
    .replace(rCapPassage, m => m.slice(3, -2).toUpperCase())
    .replace(rCapWord, m => m.slice(2).toUpperCase())
    .replace(rCapLetter, m => m.slice(1).toUpperCase());
}

function undoCharacters(str) {
  return str.split('').map(c => toAlphabet(c, ['alpha', 'punctuation'])).join('');
}

module.exports = toAlphabetText;
