const mongoose = require("mongoose")
const modelConstants = require("../constants/modelConstants.js")

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: modelConstants.userModelName
    }
})

const Task = mongoose.model(modelConstants.taskModelName, taskSchema)

module.exports = Task


