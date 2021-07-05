const express = require("express");

const User = require("../models/user.js");

const userRouter = new express.Router();

userRouter.post("/users", async (req, res) => {
	if (req.body) {
		user = new User(req.body);

		try {
			await user.save();
			const token = await user.generateAuthToken();
			res.status(201).send({ user, token });
		} catch (error) {
			res.status(400).send(error);
		}
	}
});

userRouter.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		const token = await user.generateAuthToken();

		res.send({ user, tokens });
	} catch (error) {
		res.status(400).send(error);
	}
});

userRouter.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.get("/users/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.patch("/users/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];

	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ Error: "Invalid Updates" });
	}

	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).send();
		}

		updates.forEach((update) => (user[update] = req.body[update]));

		await user.save();

		// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.delete("/users/:id", async (req, res) => {
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

module.exports = userRouter;
