
const mongoose = require('mongoose')


async function dbConnection() {

    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI)
        console.log('Database is connected')

    }
    catch (err) {
        console.log(err)

    }


}

module.exports = dbConnection