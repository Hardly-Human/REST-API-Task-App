// start mongodb Database :
// for Windows : use POWERSHELL
//  /Users/user/mongodb/bin/mongod.exe --dbpath=/Users/user/mongodb-data

// Database Structure -->
// Database name : REST-API-Task-App
// tables / collections in Database :  user, task

const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/REST-API-Task-App";

mongoose.connect(connectionURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
});
