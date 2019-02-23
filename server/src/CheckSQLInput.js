/**
 *  checks latest bitcoin price as numeric before inserting into SQL database
 */

var checkSqlInput = function(latestPrice) {
    var isNumeric;
    if(isNaN(latestPrice)) {
        isNumeric = false;
    }
    else {
        isNumeric = true;
    }
    return isNumeric;
};

// class is exported
module.exports = checkSqlInput;
