const app = require("./index");

const dotenv = require("dotenv");
// const cloudinary = require("cloudinary");
const connectDatabase = require("./src/config/database")


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
 console.log(`Error: ${err.message}`);
 console.log(`Shutting down the server due to Uncaught Exception`);
 process.exit(1);
});

// Config
dotenv.config({ path: "./src/config/config.env" });

// Connecting to database
connectDatabase();

// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_NAME,
//  api_key: process.env.CLOUDINARY_API_KEY,
//  api_secret: process.env.CLOUDINARY_API_SECRET,
// });



const server = app.listen(process.env.PORT, () => {
 console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: any) => {
 console.log(`Error: ${err.message}`);
 console.log(`Shutting down the server due to Unhandled Promise Rejection`);

 server.close(() => {
  process.exit(1);
 });
});