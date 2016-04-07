var chai = require('chai');
var expect = chai.expect;

var Base32Converter = require('../lib');

describe('Base32Converter', function() {
  describe('statics', function() {
    it('.system shoud return an object', function() {
      expect(Base32Converter.system).to.be.a('object');
    });
  });
  describe('instance', function() {
    describe('Havi System - no system parameter', function() {
      var converter;
      before(function() {
        converter = new Base32Converter();
      });
      it('#encode(\'11101\') should return X', function() {
        expect(converter.encode('11101')).to.equal('X');
      });
      it('#decode(\'X\') should return \'11101\'', function() {
        expect(converter.decode('X')).to.equal('11101');
      });
    });
    describe('Havi System', function() {
      var converter;
      before(function() {
        converter = new Base32Converter(Base32Converter.system.Havi);
      });
      it('#encode(\'11101\') should return X', function() {
        expect(converter.encode('11101')).to.equal('X');
      });
      it('#decode(\'X\') should return \'11101\'', function() {
        expect(converter.decode('X')).to.equal('11101');
      });
    });
    describe('Crockford System', function() {
      var converter;
      before(function() {
        converter = new Base32Converter(Base32Converter.system.Crockford);
      });
      it('#encode(\'11101\') should return X', function() {
        expect(converter.encode('11101')).to.equal('X');
      });
      it('#decode(\'X\') should return \'11101\'', function() {
        expect(converter.decode('X')).to.equal('11101');
      });
    });
    describe('base32hex System', function() {
      var converter;
      before(function() {
        converter = new Base32Converter(Base32Converter.system.base32hex);
      });
      it('#encode(\'11101\') should return T', function() {
        expect(converter.encode('11101')).to.equal('T');
      });
      it('#decode(\'T\') should return \'11101\'', function() {
        expect(converter.decode('T')).to.equal('11101');
      });
    });
    describe('RFC4648 System', function() {
      var converter;
      before(function() {
        converter = new Base32Converter(Base32Converter.system.RFC4648);
      });
      it('#encode(\'11101\') should return 5', function() {
        expect(converter.encode('11101')).to.equal('5');
      });
      it('#decode(\'5\') should return \'11101\'', function() {
        expect(converter.decode('5')).to.equal('11101');
      });
    });
    describe('z-base-32 System', function() {
      var converter;
      before(function() {
        converter = new Base32Converter(Base32Converter.system['z-base-32']);
      });
      it('#encode(\'11100\') should return h', function() {
        expect(converter.encode('11100')).to.equal('h');
      });
      it('#decode(\'h\') should return \'11100\'', function() {
        expect(converter.decode('h')).to.equal('11100');
      });
    });
  });
});
