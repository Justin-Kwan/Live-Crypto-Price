/**
 * extends DataBaseAccessor specifically for interacting with neocoin
 * table in db (subclass, inheriting from DataBaseAccessor)
 */

const DataBaseAccessor = require('./DataBaseAccessor.js');

// connects subclass and superclass
class NeocoinDBA extends DataBaseAccessor {

  constructor() {
    // passes coin ticker as arg into instance of superclass
    // and then inherits
    super("NEO");
  }

}

module.exports = NeocoinDBA;
