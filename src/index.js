const express = require("express")

const TaskRouters = require("./routers/taskRouter.js")
const UserRoutes = require("./routers/userRouter.js")
const mongoose = require("../src/db/mongoose.js");

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(UserRoutes)

app.use(TaskRouters)

app.listen(port, () => {
    console.log("Server is up on port ", port)
})



