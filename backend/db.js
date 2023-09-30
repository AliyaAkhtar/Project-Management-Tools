const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/PMT?directConnection=true"

async function connectToMongo(){
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");
    } catch (error) {
        console.log('Error connecting to MongoDB:',error);
    }
}

module.exports = connectToMongo;