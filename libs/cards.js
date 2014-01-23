'use strict'

var bookshelf = require('./dbconn').DB

var Card = bookshelf.Model.extend(
    { tableName: 'cards'
    }
);


module.exports = 
{ Card: Card
}
