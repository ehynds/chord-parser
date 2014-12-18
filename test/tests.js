'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var ChordParser = require('../index');
var chords = require('./lib/chords');

describe('The parser', function() {
  var result = new ChordParser(chords.join(' ')).unique();

  chords.forEach(function(chord) {
    it('should match chord ' + chord, function() {
      expect(result).to.include(chord);
    });
  });

  it('should not match a chord followed by the beginning of a bar', function() {
    var result = new ChordParser('A| A- A— A:').all();
    expect(result).to.empty();
  });

  // Use case: another enters his/her name in the chords and abbreviates
  // last name, which happens to be a chord. E.g, "Eric A." - last name
  // abbrev should not be matched.
  it('should not match a chord followed by a period', function() {
    var result = new ChordParser('A.').all();
    expect(result).to.empty();
  });
});

describe('The unique() method', function() {
  it('should return an array when there is at least one match', function() {
    var result = new ChordParser(chords.join(' ')).unique();
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.length.of.at.least(1);
  });

  it('should return an array when there are no matches', function() {
    var result = new ChordParser('').unique();
    expect(result).to.be.instanceof(Array);
    expect(result).to.be.empty();
  });

  it('should sort results alphabetically', function() {
    var result = new ChordParser('C B A').unique();
    expect(result.join('')).to.equal('ABC');
  });

  it('should not contain duplicates', function() {
    var result = new ChordParser('A A B C A D E F E').unique();
    expect(result.join('')).to.equal('ABCDEF');
  });

  it('should be case sensitive by default', function() {
    var result = new ChordParser('A a B b C c').unique();
    expect(result.join('')).to.equal('ABC');
  });

  it('should be case insensitive when the ignorecase option is set', function() {
    var result = new ChordParser('A a B b C c').unique({ ignorecase: true });
    expect(result.join('')).to.equal('AaBbCc');
  });
});

describe('The wrap() method', function() {
  var wrapper = function(chord) {
    return '<span>' + chord + '</span>';
  };

  it('should replace chords with the result of my callback', function() {
    var result = new ChordParser('A B C').wrap(wrapper);
    expect(result).to.equal('<span>A</span> <span>B</span> <span>C</span>');
  });

  it('should be case sensitive by default', function() {
    var result = new ChordParser('A b C').wrap(wrapper);
    expect(result).to.equal('<span>A</span> b <span>C</span>');
  });

  it('should be case insensitive when the ignorecase option is set', function() {
    var result = new ChordParser('A b C').wrap(wrapper, { ignorecase: true });
    expect(result).to.equal('<span>A</span> <span>b</span> <span>C</span>');
  });
});

describe('Samples', function() {
  var files = fs.readdirSync(__dirname + '/samples');

  files.forEach(function(filename) {
    describe(filename, function() {
      var contents = fs.readFileSync(__dirname + '/samples/' + filename, 'utf8');
      var metadata = JSON.parse(contents.split('\n')[0]);
      var parser = new ChordParser(contents);
      var expectedUniques = metadata.unique;
      var expectedTotal = metadata.total;
      var actualTotal = parser.all().length;

      it('should contain ' + expectedUniques + ' unique chords', function() {
        expect(parser.unique().length).to.equal(expectedUniques);
      });

      it('should contain ' + actualTotal + ' total chords', function() {
        expect(expectedTotal).to.equal(actualTotal);
      });
    });
  });
});
