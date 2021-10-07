const express = require("express")
const router = new express.Router()

const Task = require("../models/task.js");
const auth = require("../middleware/auth.js")
const User = require("../models/user.js")

router.post("/tasks", auth, async (request, response) => {

    try {
        // const task = new Task(request.body)
        const task = new Task({
            ...request.body,
            owner: request.user._id
        })
        const tasks = await task.save()
        response.status(201).send("successfully saved task !")

    } catch (error) {
        response.status(400).send(error)
    }

})


router.get("/tasks", auth, async (request, response) => {

    try {
        const tasks = await request.user.populate('virtualTasks')

        if (tasks.length === 0) {
            response.status(404).send("No task found for the user logged in !")
        } else {
            response.send(request.user.virtualTasks)
        }

    } catch (error) {
        response.status(500).send(error)
    }

})

router.get("/tasks/:id", auth, async (request, response) => {


    try {
        const id = request.params.id

        const task = await Task.findOne({_id: id, owner: request.user._id})

        if (!task) {
            response.status(404).send
        } else {
            response.send(task)
        }


    } catch (error) {
        response.status(500).send()
    }

})


router.patch("/tasks/:id", auth, async (request, response) => {

    const updates = Object.keys(request.body)
    const validUpdates = ["description", "isCompleted"]
    const isValidOperation = updates.every((update) => validUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(406).send("Can not accept given keys as patch !")
    }

    try {
        const task = await Task.findById(request.params.id)
        updates.forEach((update) => task[update] = request.body[update])

        await task.save()

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