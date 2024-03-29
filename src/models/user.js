const validator = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")

const modelConstants = require("../constants/modelConstants.js")


const Task = require("../models/task.js")

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
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})

userSchema.virtual('virtualTasks', {
    ref: modelConstants.taskModelName,
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jsonwebtoken.sign({_id: user.id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//Hide private data while fetching any user
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {

    const user = await User.findOne({email})

    if (!user) {
        throw new Error("Unable to login !")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login !")
    }
    return user

}

//hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12)
    }

    next()

})

//Delete user tasks when user is removed

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})


    next()
})

const User = mongoose.model(modelConstants.userModelName, userSchema)

module.exports = User;