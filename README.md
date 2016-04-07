# base32-converter
Multi-system (including bring-your-own) base 32 <-> binary conversion.

## Install
```bash
npm install base32-converter
```
## Usage
```javascript
var Base32Converter = require('base32-converter');
var converter = new ConvertBase(Base32Converter.system.RFC4648);
var val = converter.encode('10111');
console.log(val); // prints 'X'
console.log(converter.decode(val)); // prints '10111'
```

## Documentation

### Base32Converter([system])
Generates a new instance of the Base32Converter class. The system parameter can take multiple forms. If the system parameter is not supplied, the library will default to the [Havi](#havi) base 32 system. To use a built-in base 32 system, pass the [system constant](#converter_statics_system) to the constructor.

__Example__
```javascript
var convert = new Base32Converter(Base32Converter.system.Crockford);
```
Base32Converter also supports bringing your own system for base 32 conversion. There are two supported methods for doing this. You can either:

 1. Supply a string of 32 unique characters as the system parameter to the constructor.
 2. Create a custom system using an object hash. The parameters of the object are `validCharacters`, `characterSubstitutions`, and `pad`.
 - `validCharacters`(string): String of 32 unique characters to use for the base 32 system. (__required__)
 - `characterSubstituions`(object): Object whose keys are characters you'd like replaced and value representing replacing characters. (*optional*)
 - `pad`(string): Character to use for padding. (*optional*)

__Examples__
```javascript
// ---- Using a string
var convert = new Base32Converter('123456789ABCDEFGHIJKLMNOPQRSTUVW');

// ---- Using an object
var convert = new Base32Converter({
  validCharacters: '123456789ABCDEFGHIJKLMNOPQRSTUVW',
  characterSubstitutions: {
    '0': 'O'
  },
  pad: '0'
});
```
### Statics
#### <a name="converter_statics_system"></a>Base32Converter.system
This represents an enum of native supported base 32 number systems. Below are the supported systems. Click the system for more information.

##### <a name="converter_statics_system_havi"></a>[Base32Converter.system.Havi](#havi)
##### [Base32Converter.system.RFC4648](https://en.wikipedia.org/wiki/Base32#RFC_4648_Base32_alphabet)
##### [Base32Converter.system.z-base-32](https://en.wikipedia.org/wiki/Base32#z-base-32)
##### [Base32Converter.system.Crockford](https://en.wikipedia.org/wiki/Base32#Crockford.27s_Base32)
##### [Base32Converter.system.base32hex](https://en.wikipedia.org/wiki/Base32#base32hex)

### Instance Methods
#### Base32Converter#decode(base32String)
This method will convert the base 32 string provided as the parameter and using the supplied conversion will convert it to base 2. Any characters that are supplied as part of the string that are not part of the designated system are ignored during conversion. Padding will be applied if supported by the system.
#### Base32Converter#encode(binaryString)
This method will convert the binary string provided as the parameter and using the supplied conversion will convert it to base 32. All characters that are not 0 or 1 will be removed before processing the string.

## <a name="havi"></a>Havi Base 32 System
The Havi base 32 encoding system uses characters 0-9 and A-Z excluding I, L, O, Q. The characters I, L, and O where excluded due their similarity to 1 and 0. Q was excluded due to its representation in the phonetic alphabet. This system was developed to be used as a means by which to exchange simple encoded data over phones. The letter Q is represented as Quebec which has a 'k' sound as opposed to the 'q' sound. Also, the letter Q closely represents the appearance of 0 or O. In order to prevent unnecessary confusion, this character was excluded.
