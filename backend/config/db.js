const mongoose = require('mongoose');

const initDBConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Connected to DB Server");
  } catch (error) {
    console.log(error);
  }
};

module.exports = initDBConnection;