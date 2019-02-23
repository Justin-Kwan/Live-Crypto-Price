/**
 * extends DataBaseAccessor specifically for interacting with ethereum
 * table in db (subclass, inheriting from DataBaseAccessor)
 */

const DataBaseAccessor = require('./DataBaseAccessor.js');

// connects subclass and superclass
class EthereumDBA extends DataBaseAccessor {

  constructor() {
    // passes coin ticker as arg into instance of superclass
    // and then inherits
    super("ETH");
  }

}

module.exports = EthereumDBA;
