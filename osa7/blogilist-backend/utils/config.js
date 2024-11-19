require('dotenv').config()

const URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGO_URI
let PORT = 3003

module.exports = {URL, PORT}