const express = require("express");
require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/users", (req, res) => {
	if (req.body) {
		user = new User(req.body);
		user.save()
			.then(() => {
				res.status(201).send(user);
			})
			.catch((error) => {
				res.status(400).send(error);
			});
	}
});

app.get("/users", (req, res) => {
	User.find({})
		.then((users) => {
			res.send(users);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.get("/users/:id", (req, res) => {
	const _id = req.params.id;
	User.findById(_id)
		.then((user) => {
			if (!user) {
				return res.status(404).send();
			}
			res.send(user);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
});

// Tasks..........................................

app.post("/tasks", (req, res) => {
	task = new Task(req.body);
	task.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
});

app.get("/tasks", (req, res) => {
	Task.find({})
		.then((tasks) => {
			res.send(tasks);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.get("/tasks/:id", (req, res) => {
	const _id = req.params.id;

	Task.findById(_id)
		.then((task) => {
			if (!task) {
				return res.status(404).send();
			}
			return res.send(task);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
});

app.listen(PORT, () => console.log("Server running on port :", PORT));
