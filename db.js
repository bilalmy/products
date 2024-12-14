const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/products';


mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;