const mongoose = require("mongoose")

const databaseName = "task-manager-api"
const connectionUrl = "mongodb://localhost:27017" + "/" + databaseName

mongoose.connect(connectionUrl,
    {
        useNewUrlParser: true
    }, (error) => {
        if (error) {
            console.log("Unable to connect !")
        }else{
            console.log("Connection successful to Database")
        }
    }
)




