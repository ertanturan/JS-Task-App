const mongoose = require("mongoose")

const connectionUrl = process.env.DB_CONNECTION_URL + "/" + process.env.DB_NAME

mongoose.connect(connectionUrl,
    {
        useNewUrlParser: true
    }, (error) => {
        if (error) {
            console.log("Unable to connect to the database!",error)
        }else{
            console.log("Connection successful to Database")
        }
    }
)




