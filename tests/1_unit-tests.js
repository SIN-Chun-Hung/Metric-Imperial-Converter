const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('function convertHandler.getNum(input)', function() {

    test('Integer input', function(done) {
      let input = '2mi';
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });

    test('Decimal input', function(done) {
      let input = '2.1mi';
      assert.equal(convertHandler.getNum(input), 2.1);
      done();
    });

    test('Fractional input', function(done) {
      let input = '1/3mi';
      assert.equal(convertHandler.getNum(input), 1 / 3);
      done();
    });

    test('Fractional input with decimal numerator', function(done) {
      let input = '2.1/3mi';
      assert.equal(convertHandler.getNum(input), 2.1 / 3);
      done();
    });

    test('Invalid input multiple fraction', function(done) {
      let input = '1/2/3mi';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test('No numerical input', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('function convertHandler.getUnit(input)', function() {

    test('Check for valid unit input', function(done) {
      let input = ['kg', 'lbs', 'km', 'mi', 'l', 'gal', 'Kg', 'Lbs', 'Km', 'Mi', 'L', 'Gal'];
      let output = ['kg', 'lbs', 'km', 'mi', 'L', 'gal', 'kg', 'lbs', 'km', 'mi', 'L', 'gal'];
      input.forEach(function(element, index) {
        assert.equal(convertHandler.getUnit(element), output[index]);
      });
      done();
    });

    test('Check for invalid or unknown unit input', function(done) {
      assert.equal(convertHandler.getUnit('2miles'), undefined);
      done();
    });

  });

  suite('function convertHandler.getReturnUnit(initUnit)', function() {

    test('Check for valid unit input', function(done) {
      let input = ['kg', 'lbs', 'km', 'mi', 'l', 'gal'];
      let output = ['lbs', 'kg', 'mi', 'km', 'gal', 'L'];
      input.forEach(function(element, index) {
        assert.equal(convertHandler.getReturnUnit(element), output[index]);
      });
      done();
    });

  });

  suite('function convertHandler.spellOutUnit(unit)', function() {

    test('Check for valid unit input', function(done) {
      let input = ['kg', 'lbs', 'km', 'mi', 'l', 'gal'];
      let output = ['kilograms', 'pounds', 'kilometers', 'miles', 'liters', 'gallons'];
      input.forEach(function(element, index) {
        assert.equal(convertHandler.spellOutUnit(element), output[index]);
      });
      done();
    });

  });

  suite('function convertHandler.convert(num, unit)', function() {

    test('gal to L', function(done) {
      let input = [1, 'gal'];
      let output = 3.78541;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('L to gal', function(done) {
      let input = [3.78541, 'L'];
      let output = 1;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('kg to lbs', function(done) {
      let input = [0.453592, 'kg'];
      let output = 1;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('lbs to kg', function(done) {
      let input = [1, 'lbs'];
      let output = 0.453592;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('mi to km', function(done) {
      let input = [1, 'mi'];
      let output = 1.60934;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('km to mi', function(done) {
      let input = [1.60934, 'km'];
      let output = 1;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

  });

});