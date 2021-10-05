const validator = require("validator")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (validator.isEmail(value)) {
                console.log("successfully validated e-mail !")
            } else {
                throw new Error("E-mail is invalid")
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age can not be negative !")
            }
        },
        default: 0
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain 'password' ")
            }

        }
    },

})

const User = mongoose.model("user", userSchema)

module.exports = User;