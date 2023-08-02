const mongoose = require("mongoose")
require('dotenv').config();

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        mongoose.connect("mongodb://127.0.0.1/students",  connectionParams)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!")
    }
}
