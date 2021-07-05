const express = require("express");
require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/users", async (req, res) => {
	if (req.body) {
		user = new User(req.body);

		try {
			await user.save();
			res.status(201).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get("/users/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send(e);
	}
});

app.patch("/users/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];

	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ Error: "Invalid Updates" });
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.delete("/users/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send({ Error: "User Not Found" });
		}
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Tasks..........................................

app.post("/tasks", async (req, res) => {
	task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get("/tasks/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "isCompleted"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ Error: "Invalid Updates" });
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!task) {
			return res
				.status(404)
				.send({ Error: "Cannot find the Task by given ID" });
		}
		res.send(task);
	} catch (error) {
		return res.status(500).send(error);
	}
});

app.delete("/tasks/:id", async (req, res) => {
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

app.listen(PORT, () => console.log("Server running on port :", PORT));
