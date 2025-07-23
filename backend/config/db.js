const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB)
        console.log('Mongodb got Connected Succesfully');

    } catch (error) {
        console.log("Mongodb Conection Error", error);
    }
}

module.exports = connectDB;