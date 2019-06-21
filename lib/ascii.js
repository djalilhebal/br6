/** @file Functions to works with Braille characters */

// I found this string literal on Wikipedia
const BRAILLE_UNICODE_STR = '⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿';

/**
 * @example
 * toDotsName('⠗') === 'dots-1235'
 * 
 * @param {string} b Braille char
 * @param {string} prefix 
 */
function toDotsName(b, prefix='dots-') {
  return prefix + toDotsArray(b).map((isSet, i) => isSet ? String(i+1) : '').join('')
}

/**
 * @example
 * fromDotsName('dots-1235') === '⠗'
 * 
 * @param {string} str 
 * @returns {string} Braille char
 */
function fromDotsName(str) {
  const [, digits] = str.match(/\d+$/) || [, ''];
  const arr = Array(6).fill(0).map((_, i) => digits.contains(i+1) ? 1 : 0);
  return fromDotsArray(arr)
}

/**
 * @example
 * toDotsArray('⠗'); // [1, 1, 1, 0, 1, 0]
 * 
 * @param {string} b - Braille char
 * @returns {Array<number>}
 */
function toDotsArray(b) {
  const pos = BRAILLE_UNICODE_STR.indexOf(b);
  const arr = pos.toString(2).padStart(6, '0').split('').reverse().map(Number);
  return arr;
}

/**
 * To simulate an LED matrix display or something
 * @todo Make it work correctly
 * @todo Refactor
 * @example
 * assert.deepEqual(
 *   toDotsMatrix('⠗', 8, 5),
 *   [
 *     [1, 0, 0, 0, 0],
 *     [1, 1, 0, 0, 0],
 *     [1, 0, 0, 0, 0],
 *     [0, 0, 0, 0, 0],
 *     [0, 0, 0, 0, 0],
 *     [0, 0, 0, 0, 0],
 *     [0, 0, 0, 0, 0],
 *     [0, 0, 0, 0, 0]
 *   ]
 * );
 * 
 * @param {string} b 
 * @param {number} rows - min=3
 * @param {number} cols - min=2
 * @returns {Array<Array<number>>}
 */
function toDotsMatrix(b, rows=3, cols=2) {
  const fix = (arr) => {
    const fixed = []
    fixed[0] = arr[0]
    fixed[1] = arr[2]
    fixed[2] = arr[4]
    fixed[3] = arr[1]
    fixed[4] = arr[3]
    fixed[5] = arr[5]
    return fixed;
  }

  const arr = fix(toDotsArray(b));
  const mat = Array(rows).fill(null).map((_val, i) => {
    return Array(cols).fill(0).map((_val, j) => {
      if (i < 3 && j < 2) {
        return arr[i+j];
      } else {
        return 0;
      }
    })
  })
  return mat;
}

/**
 * @example
 * fromDotsArray([1, 1, 1, 0, 1, 0]) === '⠗';
 * 
 * @param {Array<number>} dots 
 * @returns {string}
 */
function fromDotsArray(dots) {
  const pos = Number.parseInt(dots.join(''), 2)
  const chr = BRAILLE_UNICODE_STR[pos]
  return chr;
};

/**
 * To print in ASCII-only characters
 * @todo Make it work!
 * @param {string} str 
 */
function simBr6Text(str) {
  const separator = ' \n \n '
  return str.split('').map(simBr6Char).join(separator);//.fix()
}

/**
 * @example
 * simBr6Char('⠗') === [
 *   '* '
 *   '**'
 *   '* '].join('');
 * 
 * @param {string} b - Braille char
 * @returns {string}
 */
function simBr6Char(b) {
  const arr = toDotsArray(b);
  let str = [
    '14',
    '25',
    '36'].join('\n');
  for (let i = 0; i < 6; i++) {
    str = str.replace(i+1, arr[i] ? '*' : ' ');
  }
  return str;
}

module.exports = {
  toDotsName,
  fromDotsName,
  toDotsArray,
  fromDotsArray,
  toDotsMatrix,
  simBr6Char,
}
