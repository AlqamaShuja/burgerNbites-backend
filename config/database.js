const mongoose = require("mongoose");
const url = process.env.DATABASE_URL

mongoose.connect(url).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log("Database is not connected");
});
