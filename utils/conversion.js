const conversion = {
  
    round(numberToConvert, precision) {
    var p = Math.pow(10, precision);
    return Math.round(numberToConvert * p) / p;
    
  },

    convertMeterstoInches(numberToConvert) {
    const conversion = 39.3701;
    return (numberToConvert * conversion);
    
  },
};

module.exports = conversion;