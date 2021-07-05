const express = require("express");

const User = require("../models/user.js");
const auth = require("../middlewares/auth.js");

const router = new express.Router();

router.post("/users", async (req, res) => {
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

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => req.token !== token.token
		);
		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/users/:id", auth, async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
