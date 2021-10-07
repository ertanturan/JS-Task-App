const express = require("express")

const jsonwebtoken = require("jsonwebtoken")
const mongoose = require("./db/mongoose.js")

const TaskRouters = require("./routers/taskRouter.js")
const UserRoutes = require("./routers/userRouter.js")

const {use} = require("express/lib/router");
const {request, response} = require("express");

const {ObjectId} = require("mongodb");

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(UserRoutes)

app.use(TaskRouters)

app.listen(port, () => {
    console.log("Server is up on port ", port)
})


// const Task = require("./models/task.js")
// const User = require("./models/user.js")
//
// const main = async () => {
//     // const task = await  Task.findById("615eedbe946b48ec799af8f7")
//     //
//     // await task.populate("owner")
//     //
//     //
//     // console.log(task.owner)
//
//     const user = await User.findById("615eedb7946b48ec799af8f1")
//
//     await user.populate("virtualTasks")
//
//     console.log(user.virtualTasks)
//
// }
//
// main()



