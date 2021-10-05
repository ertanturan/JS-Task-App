require("./src/db/mongoose.js")
const Task = require("./src/models/task")

// Task.findByIdAndDelete("615bfdfd55ef908c7109526f").then((result) => {
//     console.log(result)
//     return Task.countDocuments({isCompleted: false})
// }).then((documentCount) => {
//     console.log(documentCount)
// }).catch((error) => {
//     console.log(error)
// })


const deleteTaskAndCount = async (id) => {
    const deleteTask = await Task.findByIdAndDelete(id)
    console.log(deleteTask)
    const incompletedTasks = await Task.countDocuments({isCompleted: false})

    return incompletedTasks
}

deleteTaskAndCount("615c07c0b288ebe9ca6ed69e").then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})