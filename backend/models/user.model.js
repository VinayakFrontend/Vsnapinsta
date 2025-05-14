import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:''},
    bio:{type:String, default:''},
    gender:{type:String,enum:['male','female']},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
},{timestamps:true});
export const User = mongoose.model('User', userSchema);


// import mongoose from "mongoose";  // Importing mongoose to interact with MongoDB

// // Defining the user schema with various fields for a user in the app
// const userSchema = new mongoose.Schema({
//     // 'username' field which must be a unique string and is required
//     username: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
    
//     // 'email' field, also unique and required
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },

//     // 'password' field which is required for user authentication
//     password: { 
//         type: String, 
//         required: true 
//     },

//     // 'profilePicture' field stores a URL to the user's profile image
//     // Defaults to an empty string if not provided
//     profilePicture: { 
//         type: String, 
//         default: '' 
//     },

//     // 'bio' field stores a short description or bio of the user
//     // Defaults to an empty string if not provided
//     bio: { 
//         type: String, 
//         default: '' 
//     },

//     // 'gender' field stores the user's gender, which must be either 'male' or 'female'
//     gender: { 
//         type: String, 
//         enum: ['male', 'female'] 
//     },

//     // 'followers' stores an array of ObjectIds referencing other users who follow this user
//     followers: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' 
//     }],

//     // 'following' stores an array of ObjectIds referencing other users that this user is following
//     following: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' 
//     }],

//     // 'posts' stores an array of ObjectIds referencing posts created by this user
//     posts: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Post' 
//     }],

//     // 'bookmarks' stores an array of ObjectIds referencing posts that the user has bookmarked
//     bookmarks: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Post' 
//     }]
// }, { timestamps: true });  // Adds 'createdAt' and 'updatedAt' fields automatically

// // Creating and exporting the 'User' model using the schema
// export const User = mongoose.model('User', userSchema);
