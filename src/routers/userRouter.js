const express = require("express")
const {request, response} = require("express");
const User = require("../models/user.js");
const {use} = require("express/lib/router");
const router = new express.Router()

const auth = require("../middleware/auth.js")

router.post("/users", async (request, response) => {

    try {
        console.log("here")
        const user = new User(request.body)
        console.log("here1")
        await user.save()
        console.log("here2")
        const token = await user.generateAuthToken()

        console.log("here3")

        response.status(201).send({user, token})
    } catch (error) {
        response.status(400).send(error.message)
    }

})

router.get("/users/me", auth, async (request, response) => {

    response.send(request.user)

})

router.patch("/users/me", auth,async (request, response) => {

    const updates = Object.keys(request.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(406).send("Parameters sent can not be accepted !")
    }

    try {
        updates.forEach((update) => request.user[update] = request.body[update])
        await request.user.save()

        if (!request.user) {
            response.status(404).send("No user found !")
        } else {
            response.send("Successfully patched user !")
        }
    } catch (error) {
        response.status(400).send(error.message)
    }

})

router.delete("/users/me", auth, async (request, response) => {
    try {
        await request.user.remove()
        response.send(request.user)

    } catch (error) {
        response.status(400).send("Bad Request !")
    }
})


router.post("/users/login", async (request, response) => {
    try {

        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()

        // console.log(user.getPublicProfile())
        response.send({user, token: token})

    } catch (error) {
        console.log(error)
        response.status(400).send(error.message)

    }
})

router.post("/users/logout", auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => token.token !== request.token)

        await request.user.save()

        response.send()
    } catch (error) {
        response.status(500).send(error.message)
    }
})


router.post("/users/logoutAll", auth, async (request, response) => {
    try {
        request.user.tokens = []
        await request.user.save()

        response.send("Logged out from all devices !")
    } catch (error) {
        response.status(500).send(error.message)
    }
})


module.exports = router