const express = require('express');
// require makes sure file runs and mongoose connects to database
require('./db/mongoose');

// load in routers below
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

//parse json data
app.use(express.json());
//register router
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});