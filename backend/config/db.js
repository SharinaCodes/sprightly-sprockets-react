const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} - A promise that resolves when the connection is successful.
 * @throws {Error} - Throws an error if the connection to MongoDB fails.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
