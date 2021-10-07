const express = require("express")
const {request, response} = require("express");
const User = require("../models/user.js");
const {use} = require("express/lib/router");
const router = new express.Router()

const auth = require("../middleware/auth.js")

router.post("/users", async (request, response) => {

    try {
        const user = new User(request.body)
        await user.save()

        const token = await user.generateAuthToken()

        response.status(201).send({user, token})
    } catch (error) {
        response.status(400).send(error)
    }

})

router.get("/users/me", auth, async (request, response) => {

    response.send(request.user)

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

        const user = await User.findById(request.params.id)

        updates.forEach((update) => user[update] = request.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})

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


router.post("/users/login", async (request, response) => {
    try {

        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()

        response.send({user, token})
    } catch (error) {
        response.status(400).send(error)

    }
})


module.exports = router