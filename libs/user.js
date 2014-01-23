'use strict'

var bookshelf = require('./dbconn').DB

var User = bookshelf.Model.extend(
    { tableName: 'user'
});


module.exports = 
{ User: User
}
