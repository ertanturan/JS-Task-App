const express = require("express")

const TaskRouters = require("./routers/taskRouter.js")
const UserRoutes = require("./routers/userRouter.js")
require("../src/db/mongoose.js");


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(UserRoutes)

app.use(TaskRouters)

module.exports = app