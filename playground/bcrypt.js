const bcrypt = require("bcrypt");

const myFunc = async () => {
	const password = "Rehan12";
	const hashedPassword = await bcrypt.hash(password, 8);
	console.log(password);
	console.log(hashedPassword);

	const isMatch = await bcrypt.compare(password, hashedPassword);
	console.log(isMatch);
};

myFunc();
