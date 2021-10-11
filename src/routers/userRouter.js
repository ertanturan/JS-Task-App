const express = require("express")
const multer = require("multer")

const User = require("../models/user.js");

const router = new express.Router()
const auth = require("../middleware/auth.js")
const {request, response} = require("express");

router.post("/users", async (request, response) => {

    try {
        const user = new User(request.body)
        await user.save()
        const token = await user.generateAuthToken()

        response.status(201).send({user, token})
    } catch (error) {
        response.status(400).send(error.message)
    }

})

router.get("/users/me", auth, async (request, response) => {

    response.send(request.user)

})

router.patch("/users/me", auth, async (request, response) => {

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

const userUpload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(request, file, callback) {

        const isValidFormat = file.originalname.match(/\.(jpg|jpeg|png)$/)

        if (!isValidFormat) {
            callback(new Error("Please upload an image !"), false)
        } else {
            callback(undefined, true)
        }

    }
})


const avatarPath = "/users/me/avatar"
router.post(avatarPath,
    auth,
    userUpload.single("avatar"),
    async (request, response) => {

        try {
            request.user.avatar = request.file.buffer
            await request.user.save()
            response.send()
        } catch (error) {
            response.status(500).send({error: error.message})
        }


    }, (error, request, response, next) => {
        response.status(400).send({error: error.message})
    }).delete(avatarPath, auth, async (request, response) => {

    try {
        if (!request.user.avatar) {
            response.status(404).send({error: "No avatar found !"})
        } else {
            request.user.avatar = undefined
            await request.user.save()
            response.send()
        }
    } catch (error) {
        response.status(500).send({error: error.message})
    }

}).get(avatarPath, auth,async (request, response) => {
    try {

        if (!request.user || !request.user.avatar) {
            throw new Error("User or avatar not found !")
        }else {

            response.type("jpg")
            response.send(request.user.avatar)
        }

    } catch (error) {
        response.status(404).send({error: error.message})
    }
})


module.exports = router