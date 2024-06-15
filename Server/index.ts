const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require('cors');
const errorMiddleware = require("./src/middleware/error");

const BASE_URL_auth = "/auth";
const BASE_URL_FRIENDS = '/friends';


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Route Imports
const userRoutes = require("./src/routes/userRoutes");
const friendRoutes = require('./src/routes/friendRoutes');


app.use(BASE_URL_auth, userRoutes);
app.use(BASE_URL_FRIENDS, friendRoutes);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;