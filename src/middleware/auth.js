const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const auth = async (request, response, next) => {

    try {
        const token = request.header("Authorization").replace("Bearer", "").trim()
        const decoded = jwt.verify(token, "notasecret")

        const user = await User.findOne({_id: decoded._id, "tokens.token": token})

        if (user) {
            request.user = user
            next()
        } else {
            response.status(404).send("No user found !")
        }

    } catch (error) {
        response.status(401).send({error: "Please authenticate."})
    }


}

module.exports = auth