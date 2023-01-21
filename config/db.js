const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {

  mongoose.set('strictQuery', true);


  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('Database connected!')
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
