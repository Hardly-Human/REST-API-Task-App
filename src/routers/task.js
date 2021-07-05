const express = require("express");
const Task = require("../models/task.js");

const auth = require("../middlewares/auth.js");

const taskRouter = new express.Router();

taskRouter.post("/tasks", auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

taskRouter.get("/tasks", auth, async (req, res) => {
	try {
		const tasks = await Task.find({ owner: req.user._id });
		res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
	const _id = req.params.id;

	try {
		// const task = await Task.findById(_id);
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		return res.send(task);
	} catch (error) {
		res.status(500).send(e);
	}
});

taskRouter.patch("/tasks/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "isCompleted"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ Error: "Invalid Updates" });
	}

	try {
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res
				.status(404)
				.send({ Error: "Cannot find the Task by given ID" });
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (error) {
		return res.status(500).send(error);
	}
});

taskRouter.delete("/tasks/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send({ Error: "Task not Found" });
		}
		res.send(task);
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = taskRouter;
