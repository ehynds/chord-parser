# chord-parser

Utility for parsing guitar chords contained within a string of tablature. The
most common use case is to wrap all chords found within a song in an anchor tag
so that their finger chart can be presented in a tooltip.

### Install

```bash
npm install chord-parser
```

or if using on the web, grab the `dist/chord-parser.min.js` file.

### Usage

```js
var input = '\
 Gsus4                Fsus4 F                     Csus4    C      Gsus4/B     \
e|------------3-------------------1-----|-------1---------------0-----------| \
B|---------3-----3-------------------1--|----------------1------1-------1---| \
G|------5-----------5-----3--2----------|----2--------------0--------------0| \
D|-5-------------------5--3--3----------|-3-----------3-----2---------0-----| \
A|--------------------------------------|----------3---------------2--------| \
E|--------------------------------------|-----------------------------------| ';

// Import chord-parser
var ChordParser = require('chord-parser');

// Create a new ChordParser object with the input string
var tabs = new ChordParser(input);

// Wrap chords found in the string (Gsus4, Fsus4, etc.) with an anchor tag
var wrappedTab = tabs.wrap(function(chord) {
  return '<a href="">' + chord + '</a>';
});

// Return an array of unique chords found in the string
var uniques = tabs.unique(); // => ['C', 'Csus4', 'F', 'Fsus4', 'Gsus4', 'Gsus4/B'];
```

## API

### constructor

Create a new chord parsing object passing in a string of guitar tabs/chords to parse:

```js
var parser = new ChordParser(inputString);
```

### `wrap(replacerFn[, options]);`

This method calls the function `replacerFn` for each chord it finds in the
input string, passing in the chord in as its only argument. Your wrapper function should
return a string to replace the chord with. A modified version of the input
string with the transposed replacements is returned.

```js
new ChordParser('Ab C#').wrap(function(chord) {
  return '<a>' + chord + '</a>';
});

// Return value: '<a>Ab</a> <a>C#</a>'
```

### `all([options])`

Return a sorted array of all chords found in the input string.

```js
new ChordParser('Ab C# B C#').all();

// Return value: ['Ab', 'B', 'C#', 'C#']
```


### `unique([options])`

Return a sorted array of unique chords found in the input string.

```js
new ChordParser('Ab C# B C#').unique();

// Return value: ['Ab', 'B', 'C#']
```

## Options

All methods accept an options object as their last argument (or in `unique` and `all`'s case, the only argument).
* `ignorecase` (boolean) - Whether or not to ignore case sensitivity when searching the string for chords. Defaults to false.

## Tests

Run `npm test`.

## License
[MIT](http://opensource.org/licenses/MIT).
