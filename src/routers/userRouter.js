const express = require("express")
const {request, response} = require("express");
const User = require("../models/user.js");
const router = new express.Router()


router.post("/users", async (request, response) => {

    const user = new User(request.body)

    try {
        await user.save()
        response.status(201).send("Successfully created new user !")
    } catch (error) {
        response.status(400).send(error)
    }

})

router.get("/users", async (request, response) => {

    try {
        const users = await User.find({})
        response.send(users)
    } catch (error) {
        response.status(500).send()
    }

})

router.get("/users/:id", async (request, response) => {

    if (request.params.id.length < 12) {
        return response.status(400).send()
    }

    try {
        const user = await User.findById(request.params.id)

        if (!user) {
            return response.status(404).send()
        } else {
            response.send(user)
        }

    } catch (error) {
        response.status(500).send(error)
    }

})


router.patch("/users/:id", async (request, response) => {
    console.log("patch")

    const updates = Object.keys(request.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(406).send("Parameters sent can not be accepted !")
    }

    try {

        const user = await User.findByIdAndUpdate(request.params.id, request.body,
            {new: true, runValidators: true})

        if (!user) {
            console.log("not found")
            response.status(404).send("No user found !")
        } else {
            console.log("success")
            response.send("Successfully patched user !")
        }
    } catch (error) {
        console.log("error")

        response.status(400).send("Bad Request")
    }

})

router.delete("/users/:id", async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id)

        if (!user) {
            response.status(400).send("User not found by the given id !")
        } else {
            console.log(user)
            response.send("Successfully deleted user !")
        }

    } catch (error) {
        response.status(400).send("Bad Request !")
    }
})

module.exports = router