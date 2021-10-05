const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required:true,
        minlength:5
    },
    isCompleted: {
        type: Boolean,
        required:true
    }
})

const Task = mongoose.model("task", taskSchema)

module.exports = Task


