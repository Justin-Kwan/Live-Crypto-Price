/**
 * extends DataBaseAccessor specifically for interacting with bitcoin
 * table in db (subclass, inheriting from DataBaseAccessor)
 */

const DataBaseAccessor = require('./DataBaseAccessor.js');

// connects subclass and superclass
class BitcoinDBA extends DataBaseAccessor {

  constructor() {
    // passes coin ticker as arg into instance of superclass
    super("BTC");
  }

}

module.exports = BitcoinDBA;
