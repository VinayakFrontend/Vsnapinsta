import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer).content;
};
export default getDataUri;


// // Importing the DataUriParser module from 'datauri/parser.js' to handle data URI encoding.
// import DataUriParser from "datauri/parser.js";

// // Importing 'path' module to work with file and directory paths.
// import path from "path";

// // Creating an instance of the DataUriParser class to parse and format file data into a data URI.
// const parser = new DataUriParser();

// // Function to convert the uploaded file into a data URI
// const getDataUri = (file) => {
//     // Extracting the file extension (e.g., .jpg, .png) from the uploaded file using the path module.
//     const extName = path.extname(file.originalname).toString();
    
//     // Using the parser to convert the file's buffer data into a data URI format.
//     // 'file.buffer' contains the actual file data, and 'extName' is the file's extension.
//     return parser.format(extName, file.buffer).content;
// };

// // Exporting the 'getDataUri' function so it can be used in other parts of the application.
// export default getDataUri;



