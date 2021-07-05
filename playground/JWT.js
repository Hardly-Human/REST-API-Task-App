const jwt = require("jsonwebtoken");

const myFunc = async () => {
	const token = jwt.sign({ _id: "Rehan" }, "secretkey");
	console.log(token);

	const data = jwt.verify(token, "secretkey");
	console.log(data);
};

myFunc();
