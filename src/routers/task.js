const express = require("express");

const Task = require("../models/task.js");

const taskRouter = new express.Router();

taskRouter.post("/tasks", async (req, res) => {
	task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

taskRouter.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

taskRouter.get("/tasks/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		if (!task) {
			return res.status(404).send();
		}
		return res.send(task);
	} catch (error) {
		res.status(500).send(e);
	}
});

taskRouter.patch("/tasks/:id", async (req, res) => {
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

		const task = await Task.findById(req.params.id);

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

taskRouter.delete("/tasks/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return res.status(404).send({ Error: "Task not Found" });
		}
		res.send(task);
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = taskRouter;
