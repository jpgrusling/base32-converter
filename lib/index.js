'use strict';

var leftpad = require('./left-pad');
var systemsInfo = require('./systems');

/**
 * @constructor
 * @name Base32Converter
 * @description Represents a conversion mechanism.
 * @param {string|object} system
 *   Pass in the constant representing the base 32 system to use.
 *   For custom systems, you can pass in a string with 32 unique
 *   characters or an object with properties validCharacters, and
 *   optionally characterSubstitutions and pad.
 * @return {Base32Converter} New instsance of Base32Converter objet.
 */
var Base32Converter = function Base32Converter(system) {
  if (!(this instanceof Base32Converter)) {
    return new Base32Converter(system);
  }

  system = system || systemsInfo.systemIdMap.Havi;

  if (typeof system === 'string') {
    this.$ = systemsInfo.systems[system];
    if (this.$ === undefined) {
      system = system.split('').filter(function(char, i, arr) {
        return arr.indexOf(char) === i;
      }).join('');
      if (system.length === 32) {
        this.$ = {
          validCharacters: system
        };
      } else {
        throw new RangeError('Invalid base 32 system specified.');
      }
    }
  } else if (typeof system === 'object') {
    if (!('validCharacters' in system)) {
      throw new Error('The validCharacters' +
        ' property must be set of the options parameter.');
    }
    if (typeof system.validCharacters !== 'string') {
      throw new TypeError('The validCharacters property must be a string.');
    }
    system.validCharacters = system.validCharacters
      .split('').filter(function(char, i, arr) {
        return arr.indexOf(char) === i;
      }).join('');
    if (system.validCharacters.length !== 32) {
      var err = new RangeError('The validCharacters' +
        ' property must have 32 unique characters.');
      err.characters = system.validCharacters;
      throw err;
    }
    this.$ = system;
  } else {
    throw new TypeError('Invalid parameter.');
  }

  return this;
};

/**
 * @enum {string}
 * @name Base32Converter.system
 * @description Enum representing the constants for the
 *   supported conversion systems.
 */
Base32Converter.system = systemsInfo.systemIdMap;

/**
 * @name Base32Converter#decode
 * @description Decode base 32 value to binary.
 * @param {string} base32String The base 32 value.
 * @return {string} The binary representation of base 32 value.
 */
Base32Converter.prototype.decode = function(base32String) {
  if (typeof base32String !== 'string') {
    throw new TypeError('Parameter must be a string.');
  }
  for (var char in this.$.characterSubstitutions) {
    base32String = base32String.replace(new RegExp(char, 'ig'),
      this.$.characterSubstitutions[char]);
  }
  var out = '';
  base32String.split('').forEach(function(character) {
    var i = this.$.validCharacters.indexOf(character);
    if (i === -1) {
      return;
    }
    if (this.$.pad !== undefined) {
      out += leftpad(i.toString(2), 5, this.$.pad);
    } else {
      out += i.toString(2);
    }
  }.bind(this));
  return out;
};

/**
 * @name Base32Converter#encode
 * @description Encode binary value to base 32.
 * @param {string} binaryString The binary value.
 * @return {string} The base 32 representation of binary value.
 */
Base32Converter.prototype.encode = function(binaryString) {
  if (typeof binaryString !== 'string') {
    throw new TypeError('Parameter must be a string.');
  }
  var extra = binaryString.substr(0, binaryString.length % 5);
  var most = binaryString.substr(extra.length);
  var out = '';
  if (extra.length) {
    out = this.$.validCharacters[parseInt(extra, 2)];
  }
  most.match(/.{1,5}/g).forEach(function(charCode) {
    out += this.$.validCharacters[parseInt(charCode, 2)];
  }.bind(this));
  return out;
};

module.exports = exports = Base32Converter;
