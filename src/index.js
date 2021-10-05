const express = require("express")

const mongoose = require("./db/mongoose.js")

const User = require("./models/user.js")
const Task = require("./models/task.js")

const {use} = require("express/lib/router");
const {request, response} = require("express");
const {ObjectId} = require("mongodb");

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users",
    (request, response) => {

        const user = new User(request.body)

        user.save().then(() => {
            console.log("successfully saved")
            response.status(201).send("successfully saved user !")
        }).catch((e) => {
            console.log("error while trying to save !")
            response.status(400).send(e)
        })

    })


app.post("/tasks", (request, response) => {

    const task = new Task(request.body)

    task.save().then((resultDoc,) => {
        console.log("successfully saved task ", resultDoc)
        response.status(201).send("successfully saved task !")
    }).catch((e) => {
        response.status(400).send(e)
    })

})

app.get("/users", (request, response) => {

    User.find({}).then((users) => {
        response.send(users)
    }).catch(() => {
        response.status(500).send()
    })

})

app.get("/users/:id", (request, response) => {

    if (request.params.id.length < 12) {
        return response.status(400).send()
    }

    User.findById(request.params.id).then((user) => {
        console.log(user)
        if (!user) {
            return response.status(404).send()
        } else {
            response.send(user)
        }

    }).catch((error) => {
        response.status(500).send(error)
    })
})

app.get("/tasks", (request, response) => {


    Task.find({}).then((users) => {
        response.send(users)
    }).catch(() => {
        response.status(500).send()
    })

})

app.get("/tasks/:id", (request, response) => {
    Task.findById(request.params.id).then((user) => {

        if (!user) {
            return response.status(404).send()
        } else {
            response.send(user)
        }

    }).catch((error) => {
        response.status(500).send()
    })
})


app.listen(port, () => {
    console.log("Server is up on port ", port)
})