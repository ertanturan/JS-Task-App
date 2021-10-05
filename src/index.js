const express = require("express")

const mongoose = require("./db/mongoose.js")

const UserRoutes = require("./routers/userRouter.js")
const TaskRouters = require("./routers/taskRouter.js")

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