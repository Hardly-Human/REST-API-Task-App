// start mongodb Database :
// for Windows : use POWERSHELL
//  /Users/user/mongodb/bin/mongod.exe --dbpath=/Users/user/mongodb-data

const mongoose = require("mongoose");
const validator = require("validator");

const connectionURL = "mongodb://127.0.0.1:27017";

// mongoose.connect(connectionURL + "/users", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// });

// const userSchema = mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		lowercase: true,
// 		validate(value) {
// 			if (!validator.isEmail(value)) {
// 				throw new Error("Please Enter a Valid Email.");
// 			}
// 		},
// 	},
// 	age: {
// 		type: Number,
// 		default: 0,
// 		validate(value) {
// 			if (value < 0) {
// 				throw new Error("Age cannot be Negative.");
// 			}
// 		},
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		minLength: [6, "Atleast 6 characters Required."],
// 		validate(value) {
// 			if (value.includes("password")) {
// 				throw new Error("Password cannot have phrase 'password'.");
// 			}
// 		},
// 	},
// });

// const User = mongoose.model("user", userSchema);

// const demoUser = new User({
// 	name: "Shaik rehan  ",
// 	age: 20,
// 	email: "rehan@gmail.com",
// 	password: "rehanud",
// });

// demoUser
// 	.save()
// 	.then((user) => console.log(user))
// 	.catch((error) => console.log(error));

mongoose.connect(connectionURL + "/tasks", {
	useNewUrlParser: true,
	useCreateIndex: true,
});

const taskSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
});

const Task = mongoose.model("task", taskSchema);

const demoTask = new Task({
	description: "Exercise Daily  ",
	isCompleted: true,
});

demoTask
	.save()
	.then((task) => console.log(task))
	.catch((error) => console.log(error));
