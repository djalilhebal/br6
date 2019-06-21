# Br6
A simple, Unified English Braille (UEB) Grade 1 library \[old WIP\]

*Br6 = 6-dot Braille*

## Usage
Installing:
```sh
npm install br6
```

Example:
```js
const {toBrailleText, toAlphabetText} = require('br6');

const sentence = 'Lewis CARROLL published "ALICE IN WONDERLAND" in 1865. ^~^';
const inBraille = toBrailleText(sentence);
// '⠠⠇⠑⠺⠊⠎⠀⠠⠠⠉⠁⠗⠗⠕⠇⠇⠀⠏⠥⠃⠇⠊⠎⠓⠑⠙⠀⠦⠠⠠⠠⠁⠇⠊⠉⠑⠀⠊⠝⠀⠺⠕⠝⠙⠑⠗⠇⠁⠝⠙⠠⠄⠴⠀⠊⠝⠀⠼⠁⠓⠋⠑⠲⠀⠤⠤⠤'
const inAlphabet = toAlphabetText(inBraille);
// 'Lewis CARROLL published “ALICE IN WONDERLAND” in 1865. ---'
```

## Learning Braille
These are the resources I used and liked:
- [Rules of Unified English Braille, second edition, 2013](http://iceb.org/ueb.html)
- [Brailliac: Braille Tutor](https://play.google.com/store/apps/details?id=com.lukeneedham.brailletutor) app
- Unified English Braille Chart (Braille Cheat Sheet) by Aroga Technologies (2014)
- LEARN BRAILLE font by WeMe Studio (more like a mnemonical image)

## How It Works
Legend: <b style="color:orange;">ORANGE MEANS CHANGE</b>; <b style="color:green;">GREEN MEANS ADDITION</b>. [The GitHub Pages' version displays colors correctly](https://dreamski21.github.io/br6).

- Starting with a text like this:
> Lewis CARROLL published "ALICE IN WONDERLAND" in 1865. ^~^

- Convert straight quotation marks to curly ones
> Lewis CARROLL published <b style="color:orange;">“</b>ALICE IN WONDERLAND<b style="color:orange;">”</b> in 1865. ^~^

- Replace (yet) unsupported characters with "-"
> Lewis CARROLL published “ALICE IN WONDERLAND” in 1865. <b style="color:orange;">---</b>

- Add capital indicators and terminators, then lowercase everything
> Lewis CARROLL published “<b style="color:green;">⠠⠠⠠</b><b style="color:orange;">alice in wonderland</b><b style="color:green;">⠠⠄</b>” in 1865. ---

> Lewis <b style="color:green;">⠠⠠</b><b style="color:orange;">carroll</b> published “⠠⠠⠠alice in wonderland⠠⠄” in 1865. ---

> <b style="color:green;">⠠</b><b style="color:orange;">l</b>ewis ⠠⠠carroll published “⠠⠠⠠alice in wonderland⠠⠄” in 1865. ---

- Add numeric indicators and translate numbers
> ⠠lewis ⠠⠠carroll published “⠠⠠⠠alice in wonderland⠠⠄” in <b style="color:green;">⠼</b><b style="color:orange;">⠁⠓⠋⠑</b>. ---

- Using a map, convert the remaining characters to Braille
> ⠠<b style="color:orange;">⠇⠑⠺⠊⠎⠀</b>⠠⠠<b style="color:orange;">⠉⠁⠗⠗⠕⠇⠇⠀⠏⠥⠃⠇⠊⠎⠓⠑⠙⠀⠦</b>⠠⠠⠠<b style="color:orange;">⠁⠇⠊⠉⠑⠀⠊⠝⠀⠺⠕⠝⠙⠑⠗⠇⠁⠝⠙</b>⠠⠄<b style="color:orange;">⠴⠀⠊⠝⠀</b>⠼⠁⠓⠋⠑<b style="color:orange;">⠲⠀⠤⠤⠤</b>

- And there you have it:
> ⠠⠇⠑⠺⠊⠎⠀⠠⠠⠉⠁⠗⠗⠕⠇⠇⠀⠏⠥⠃⠇⠊⠎⠓⠑⠙⠀⠦⠠⠠⠠⠁⠇⠊⠉⠑⠀⠊⠝⠀⠺⠕⠝⠙⠑⠗⠇⠁⠝⠙⠠⠄⠴⠀⠊⠝⠀⠼⠁⠓⠋⠑⠲⠀⠤⠤⠤

## TODO
- [ ] Either handle letters with accents/diacritics, or remove them (`Téle` -> `Tele`)
- [ ] Support contractions and wordsigns
- [ ] ...

## License
CC0
