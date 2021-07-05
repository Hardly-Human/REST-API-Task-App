const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Please Enter a Valid Email.");
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age cannot be Negative.");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: [6, "Atleast 6 characters Required."],
		validate(value) {
			if (value.includes("password")) {
				throw new Error("Password cannot have phrase 'password'.");
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "owner",
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "secretkey");

	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email });

	if (!user) {
		throw new Error("Email Not Registered");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Invalid Password");
	}

	return user;
};

// Hahing Password.......
userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model("user", userSchema);

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

module.exports = User;
