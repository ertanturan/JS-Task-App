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

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
router.get("/tasks", auth, async (request, response) => {

    const match = {}
    const sort = {}
    if (request.query.isCompleted) {
        console.log("here ?")
        match.isCompleted = request.query.isCompleted === 'true'
    }

    if (request.query.sortBy) {
        const parts = request.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const tasks = await request.user.populate({
            path: 'virtualTasks',
            match: match,
            options: {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip),
                sort: sort
            }
        })

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
        const task = await Task.findOne({_id: request.params.id, owner: request.user._id})

        if (!task) {
            return response.status(404).send("Task not found !")
        } else {
            updates.forEach((update) => task[update] = request.body[update])

            await task.save()
            response.send(task)
        }
    } catch (error) {
        response.status(400).send("Bad Request !" + error.message)
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