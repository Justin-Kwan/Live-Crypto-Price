/**
 * extends DataBaseAccessor specifically for interacting with bat token
 * table in db (subclass, inheriting from DataBaseAccessor)
 */

const DataBaseAccessor = require('./DataBaseAccessor.js');

// connects subclass and superclass
class BasicAttentionTokenDBA extends DataBaseAccessor {

  constructor() {
    // passes coin ticker as arg into instance of superclass
    // and then inherits
    super("BAT");
  }

}

module.exports = BasicAttentionTokenDBA;
