function splitNumString(input) {

  let numPart = input.match(/[.\d\/]+/g) || ['1'];
  let unitPart = input.match(/[a-z]+/ig);
  return [numPart[0], unitPart[0]];
}

function divisionCheck(possibleFraction) {
  let nums = possibleFraction.split('/');
  if (nums.length > 2) {
    return false;
  }

  return nums;
}

function ConvertHandler() {

  this.getNum = function(input) {
    let result = splitNumString(input)[0];
    let nums = divisionCheck(result);

    if (!nums) {
      return undefined;
    }
    let numerator = nums[0];
    let denominator = nums[1] || "1";

    if (isNaN(numerator) || isNaN(denominator)) {
      return undefined;
    }

    result = parseFloat(numerator) / parseFloat(denominator);
    return result;
  };

  this.getUnit = function(input) {
    let result = splitNumString(input)[1].toLowerCase();

    if (result === 'km') {
      return 'km';
    } else if (result === 'kg') {
      return 'kg';
    } else if (result === 'gal') {
      return 'gal';
    } else if (result === 'lbs') {
      return 'lbs';
    } else if (result === 'mi') {
      return 'mi';
    } else if (result === 'l') {
      return 'L';
    } else {
      return undefined;
    }

  };

  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    if (unit === 'km') {
      return 'mi';
    } else if (unit === 'kg') {
      return 'lbs';
    } else if (unit === 'gal') {
      return 'L';
    } else if (unit === 'lbs') {
      return 'kg';
    } else if (unit === 'mi') {
      return 'km';
    } else if (unit === 'l') {
      return 'gal';
    } else {
      return undefined;
    }

  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    if (unit === 'km') {
      return 'kilometers';
    } else if (unit === 'kg') {
      return 'kilograms';
    } else if (unit === 'gal') {
      return 'gallons';
    } else if (unit === 'lbs') {
      return 'pounds';
    } else if (unit === 'mi') {
      return 'miles';
    } else if (unit === 'l') {
      return 'liters';
    } else {
      return "None";
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    if (unit === 'km') {
      result = initNum / miToKm;
    } else if (unit === 'kg') {
      result = initNum / lbsToKg;
    } else if (unit === 'gal') {
      result = initNum * galToL;
    } else if (unit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (unit === 'mi') {
      result = initNum * miToKm;
    } else if (unit === 'l') {
      result = initNum / galToL;
    } else {
      result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
