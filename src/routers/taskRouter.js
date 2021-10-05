const express = require("express")
const Task = require("../models/task.js");
const router = new express.Router()


router.post("/tasks", async (request, response) => {

    try {
        const task = new Task(request.body)

        const tasks = await task.save()
        console.log("successfully saved task ", tasks)
        response.status(201).send("successfully saved task !")

    } catch (error) {
        response.status(400).send(error)
    }

})


router.get("/tasks", async (request, response) => {

    try {
        console.log("entered")
        const tasks = await Task.find({})
        console.log(tasks)
        response.send(tasks)

    } catch (error) {
        response.status(500).send(error)
    }

})

router.get("/tasks/:id", async (request, response) => {


    try {
        const task = await Task.findById(request.params.id)
        response.send(task)

    } catch (error) {
        response.status(500).send()
    }

})


router.patch("/tasks/:id", async (request, response) => {

    const updates = Object.keys(request.body)
    const validUpdates = ["description", "isCompleted"]
    const isValidOperation = updates.every((update) => validUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(406).send("Can not accept given keys as patch !")
    }

    try {
        const task = await Task.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})

        if (!task) {
            return response.status(404).send("Task not found !")
        } else {
            response.send(task)
        }
    } catch (error) {
        response.status(400).send("Bad Request !")
    }

})

router.delete("/tasks/:id", async (request, response) => {
    try {
        const task = await Task.findByIdAndDelete(request.params.id)
        if (!task) {
            response.status(404).send("Task not found by the given id !")
        } else {
            response.send("Task deleted successfully !\n")
        }
    } catch (error) {
        response.status(400).send("Bad request")
    }
})


module.exports = router