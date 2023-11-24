// Connect the DB

const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/Intranet", 
{useNewUrlParser: true})

.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));