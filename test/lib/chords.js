var fs = require('fs');
var path = require('path');

var roots = [
  'A', 'Ab', 'A#',
  'B', 'Bb',
  'C', 'C#',
  'D', 'Db', 'D#',
  'E', 'Eb',
  'F', 'F#',
  'G', 'Gb', 'G#'
];

var modifiers = [
  'm',
  'm6',
  'm7',
  'm9',
  'm11',
  'm13',
  'maj7',
  'maj9',
  'maj11',
  'maj13',
  'maj7b5',
  'maj7#5',
  'maj9#11',
  'maj13#11',
  'mMaj7',
  'mMaj9',
  'mM7#5',
  'mM7bb5',
  'mM7b5',
  'mM9',
  'mM13',
  'm7b5',
  'm7sus2',
  'm7sus4',
  'm7sus2sus4',
  'm7sus2#5',
  'm7sus4#5',
  'm7#5',
  'add9',
  'madd9',
  'm6add9',
  'aug',
  'aug7',
  '5',
  '6',
  '6add9',
  '6b5',
  '7',
  '7b5',
  '7b9',
  '7b11',
  '7#5',
  '7#9',
  '7#9b5',
  '7sus4',
  '9',
  '9#5',
  '9b5',
  '9b7',
  '9b11',
  '9sus4',
  '11',
  '11#13',
  '11b9',
  '13',
  'dim',
  'dim7',
  'sus2',
  'sus3',
  'sus4',
  'sus5',
  'sus2sus4'
];

var splits = [
  'Fm/C',
  'A/C#', 'A/E', 'A/F', 'A/F#', 'A/G', 'A/G#',
  'Am/C', 'Am/E', 'Am/F', 'Am/F#', 'Am/G', 'Am/G#',
  'C/E', 'C/F', 'C/G',
  'D/F#', 'D/A', 'D/Bb', 'D/B', 'D/C',
  'E/B', 'E/C#', 'E/D', 'E/D#', 'E/F', 'E/F#', 'E/G', 'E/G#',
  'Em/B', 'Em/C#', 'Em/D', 'Em/D#', 'Em/F', 'Em/F#', 'Em/G', 'Em/G#',
  'F/C', 'F/D', 'F/D#', 'F/E', 'F/G', 'F/A',
  'G/B', 'G/D', 'G/E', 'G/F', 'G/F#'
];

var chords = [].concat(splits);
roots.forEach(function(root) {
  chords.push(root);

  modifiers.forEach(function(modifier) {
    chords.push(root + modifier);
  });
});

// Write these to some sample files
var metadata = JSON.stringify({ total:chords.length, unique:chords.length }) + '\n';
fs.writeFileSync(path.resolve('test/samples/all.txt'), metadata + chords.join(' '));
fs.writeFileSync(path.resolve('test/samples/all-mangled.txt'), metadata + chords.join(' A| A- A. A: About word a # + |'));

module.exports = chords;
