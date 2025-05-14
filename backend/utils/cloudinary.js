import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
export default cloudinary;


// // Importing the 'v2' version of the Cloudinary module and renaming it as 'cloudinary' for easier use.
// import { v2 as cloudinary } from "cloudinary";

// // Importing the 'dotenv' module to load environment variables from a .env file.
// import dotenv from "dotenv";

// // Configuring dotenv to load environment variables from the .env file into the process.
// dotenv.config({});

// // Configuring Cloudinary using environment variables (which are securely stored in a .env file).
// cloudinary.config({
//     // Setting Cloudinary configuration using environment variables to keep sensitive data secure.
//     cloud_name: process.env.CLOUD_NAME,   // Cloudinary cloud name (unique to your Cloudinary account).
//     api_key: process.env.API_KEY,         // Cloudinary API key (used to authenticate requests).
//     api_secret: process.env.API_SECRET    // Cloudinary API secret (used to authenticate requests).
// });

// // Exporting the 'cloudinary' object so it can be used elsewhere in the application for uploading, fetching, or managing media.
// export default cloudinary;
