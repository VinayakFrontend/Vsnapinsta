// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('mongodb connected successfully.');
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default connectDB;


// // Step 1: Import mongoose library to interact with MongoDB
// import mongoose from "mongoose";

// // Step 2: Define an asynchronous function to connect to MongoDB
// const connectDB = async () => {
//     try {
//         // Step 3: Attempt to connect to MongoDB using the connection string from environment variables
//         await mongoose.connect(process.env.MONGO_URI);
        
//         // Step 4: If connection is successful, log a confirmation message
//         console.log('mongodb connected successfully.');
//     } catch (error) {
//         // Step 5: If there is an error during connection, catch and log the error
//         console.log(error);
//     }
// }

// // Step 6: Export the connectDB function so it can be used elsewhere in the application
// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;

