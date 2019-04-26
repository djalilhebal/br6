const MAP = require('./map.json');

const isBraille = (x) => /^[\u2800-\u28FF]$/.test(x);

function toBraille(str, sections) {
  if (!sections) { // search in all sections
    sections = Object.keys(MAP);
  }

  for (const section of sections) {
    if (str in MAP[section]) {
      return MAP[section][str];
    }
  }

  return str;
}

function toAlphabet(str, sections) {
  if (!sections) { // search in all sections
    sections = Object.keys(MAP);
  }

  for (const section of sections) {
    for (const key in MAP[section]) {
      if (str === MAP[section][key]) {
        return key;
      }
    }
  }

  return str;
}

module.exports = {
  MAP,
  isBraille,
  toBraille,
  toAlphabet,
}
