const conversion = {
  
    round(numberToConvert, precision) {
    var p = Math.pow(10, precision);
    return Math.round(numberToConvert * p) / p;
    
  },

};