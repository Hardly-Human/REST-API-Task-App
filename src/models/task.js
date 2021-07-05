const mongoose = require("mongoose");

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
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

const Task = mongoose.model("task", taskSchema);

// const demoTask = new Task({
// 	description: "Exercise Daily  ",
// 	isCompleted: true,
// });

// demoTask
// 	.save()
// 	.then((task) => console.log(task))
// 	.catch((error) => console.log(error));

module.exports = Task;
