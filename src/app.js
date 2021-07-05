const express = require("express");
require("./db/mongoose.js");

const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware ==> new request ==> route handler

// with middleware ==> new request ==> do something ==> route handler

app.listen(PORT, () => console.log("Server running on port :", PORT));
