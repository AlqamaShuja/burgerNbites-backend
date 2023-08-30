require("dotenv").config();
require('./config/database');
const express = require("express");
const allRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ 
    origin: "*", // credentials: true,
}));
// Routes
allRoutes(app);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});