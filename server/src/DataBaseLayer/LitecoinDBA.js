/**
 * extends DataBaseAccessor specifically for interacting with litecoin
 * table in db (subclass, inheriting from DataBaseAccessor)
 */

const DataBaseAccessor = require('./DataBaseAccessor.js');

// connects subclass and superclass
class LitecoinDBA extends DataBaseAccessor {

  constructor() {
    // passes coin ticker as arg into instance of superclass
    // and then inherits
    super("LTC");
  }

}

module.exports = LitecoinDBA;
