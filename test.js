const {describe} = require('riteway');
const {toBrailleText, toAlphabetText, ascii} = require('./lib');

const given = 'an example';

describe("toBrailleText()", async (assert) => {
  const toBraille = toBrailleText; // alias
  assert({
    given,
    should: 'handle a complex input',
    actual: toBraille('Lewis CARROLL published "ALICE IN WONDERLAND" in 1865. ^~^ '),
    expected: '⠠⠇⠑⠺⠊⠎⠀⠠⠠⠉⠁⠗⠗⠕⠇⠇⠀⠏⠥⠃⠇⠊⠎⠓⠑⠙⠀⠦⠠⠠⠠⠁⠇⠊⠉⠑⠀⠊⠝⠀⠺⠕⠝⠙⠑⠗⠇⠁⠝⠙⠠⠄⠴⠀⠊⠝⠀⠼⠁⠓⠋⠑⠲⠀⠤⠤⠤'
  });

})

describe("toAlphabetText()", async (assert) => {
  const toEnglish = toAlphabetText; // alias
  assert({
    given,
    should: 'handle a complex input',
    actual: toEnglish('⠠⠇⠑⠺⠊⠎⠀⠠⠠⠉⠁⠗⠗⠕⠇⠇⠀⠏⠥⠃⠇⠊⠎⠓⠑⠙⠀⠦⠠⠠⠠⠁⠇⠊⠉⠑⠀⠊⠝⠀⠺⠕⠝⠙⠑⠗⠇⠁⠝⠙⠠⠄⠴⠀⠊⠝⠀⠼⠁⠓⠋⠑⠲⠀⠤⠤⠤'),
    expected: 'Lewis CARROLL published “ALICE IN WONDERLAND” in 1865. ---'
  });
})

describe("toDotsArray and toDotsMatrix()", async (assert) => {
  const {toDotsArray, toDotsMatrix} = ascii;

  assert(  {
    actual: toDotsArray('⠗'),
    expected: [1, 1, 1, 0, 1, 0], // 1 0 1 1 1 0
  });

  assert({
    given: 'a character',
    should: 'return a matrix',
    actual: toDotsMatrix('⠗', 8, 5),
    expected: [
     [1, 0, 0, 0, 0],
     [1, 1, 0, 0, 0],
     [1, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0]
    ]
  });
})
