// ASCII Utilities

// I found these two string literals on Wikipedia
const BR6_ASCII_STRING_LITERAL =
' A1B\'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=';
const BR6_UNICODE_STRING_LITERAL =
'⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿';

/**
 * @example
 * getDotsArray('⠗'); // [1, 1, 1, 0, 1, 0]
 * 
 * @param {string} b - Braille character
 * @returns {Array<number>}
 */
function getDotsArray(b) {
  const arr = [0, 0, 0, 0, 0, 0];
  let val = BR6_UNICODE_STRING_LITERAL.indexOf(b);
  let i = 0;
  while (val !== 0) {
    arr[i] = val % 2;
    val = Math.floor(val / 2);
    i++;
  }
  return arr;
}


/**
 * @example
 * simBr6Char(getDotsArray('⠗') === [
 *   '* '
 *   '**'
 *   '* '].join('');
 * 
 * @param {Array<number>} dots - as outputed by getDotsArray
 * @returns {string}
 */
function simBr6Char(dots) {
  if (dots.length !== 6) {
    throw new Error('The "dots" array must be of length 6'); 
  }

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
  getDotsArray,
  simBr6Char,
}
