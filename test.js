const {describe} = require('riteway');
const {toBrailleText, toAlphabetText} = require('./lib');

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
