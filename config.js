require('dotenv').config();

const prod = process.env.NODE_ENV === 'production';
module.exports = {
  JWT_SECRET: prod ? process.env.JWT_SECRET : 'secret key',
  PORT: process.env.PORT || 3000,
  MONGO_URI: 'mongodb://localhost:27017/diplomadb',
};
