const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mshari7185:###@gallary.xducnkc.mongodb.net/wit')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
