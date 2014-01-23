var bookshelf = require('bookshelf'),
    config = require('./config')

bookshelf.DB = bookshelf.initialize(
    { client: config.db.client
    , connection: config.db.connection
    }
)

module.exports = bookshelf
