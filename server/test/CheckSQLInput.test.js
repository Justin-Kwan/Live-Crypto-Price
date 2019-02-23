const expect = require('chai').expect;
const assert = require('assert');
const checkSqlInput = require('../src/CheckSQLInput.js');

describe('Testing Check SQL Input is Numeric', function() {

  it('should return true when 5 is passed in', function(done) {
    let result = checkSqlInput(5);
    expect(result).to.be.true;
    done();
  });

  it('should return false when "a" is passed in', function(done) {
    let result = checkSqlInput("a");
    expect(result).to.be.false;
    done();
  });

});
