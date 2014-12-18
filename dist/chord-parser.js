/* v0.1.0 - Thu Dec 18 2014 08:45:51 */
(function(name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) module.exports = definition();
  else if (typeof define === 'function' && define.amd) define(definition);
  else context[name] = definition();
})('ChordParser', this, function() {
  'use strict';

  var extend = function() {
    var args = [].slice.call(arguments);
    var src = args.shift();
    var obj, key;

    /* jshint boss:true */
    while(obj = args.shift()) {
      for(key in obj) {
        if(obj.hasOwnProperty(key)) {
          src[key] = obj[key];
        }
      }
    }

    return src;
  };

  // Build the regex string
  var parser = (
    // Word boundry followed by a root chord
    '\\b[A-G]' +

    '(?:' +
      // Attempt to match variations after the root chord, like a minor,
      // add7, sus4, 7, etc.
      '(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\\d)?' +

      // Handle split chords like D#m/7, A/C, etc.
      '(?:\\/[A-G0-9])?' +
    ')*' +

    // Match the above variations as along as they're not followed by a pipe or
    // hyphen, etc.. This prevents string names from being matched as a chord at the
    // beginning of a bar, or matching the author's name who abbreviates his/her
    // last name.
    '(?!\\||—|-|\\.|:)' +

    // Keep matching until a hash or word boundry
    '(?:\\b|#)+'
  );

  /**
   * @constructor
   * @param {string} input - string that contains chords
   */
  function ChordParser(input) {
    if(typeof input !== 'string') {
      throw new Error('ChordParser must be involved with a string');
    }
    if(!(this instanceof ChordParser)) {
      return new ChordParser(input);
    }

    this.input = input;
    this.defaults = { ignorecase: false };
  }

  /**
   * Replace each chord in the tab with a string of your own choosing.
   * This is most commonly used to wrap a chord in an anchor tag.
   * @param {function} fn - function that is passed a chord as its only argument, and should return a modified (wrapped) version of the chord.
   * @param [opts] - configuration options.
   * @param [opts.ignorecase] - perform a case-insensitive search. Defaults to true.
   * @returns {string} updated string with the tabs transposed.
   */
  ChordParser.prototype.wrap = function(fn, opts) {
    opts = extend({}, this.defaults, opts || {});
    var regex = new RegExp(parser, opts.ignorecase ? 'gi' : 'g');

    return this.input.replace(regex, function(chord) {
      return fn(chord);
    });
  };

  /**
   * Retrieve an array of all chords found in the string, sorted alphabetically
   * @param [opts] - configuration options.
   * @param [opts.ignorecase] - perform a case-insensitive search. Defaults to true.
   * @returns {array} array of chords found in the string
   */
  ChordParser.prototype.all = function(opts) {
    opts = extend({}, this.defaults, opts || {});
    var regex = new RegExp(parser, opts.ignorecase ? 'gi' : 'g');
    var matches = this.input.match(regex);

    return !matches ? [] : matches.sort(function(a, b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0;
    });
  };

  /**
   * Retrieve an array of unique chords found in the string, sorted alphabetically
   * @param [opts] - configuration options.
   * @param [opts.ignorecase] - perform a case-insensitive search. Defaults to true.
   * @returns {array} array of unique chords found in the string, alpha sorted.
   */
  ChordParser.prototype.unique = function(opts) {
    return this.all(opts).filter(function(chord, index, arr) {
      return arr.indexOf(chord) === index;
    });
  };

  return ChordParser;
});
