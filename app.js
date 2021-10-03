const {MongoClient, ObjectId} = require("mongodb")

const mongoURL = "mongodb://localhost:27017"
const databaseName = "task-manager-app"


MongoClient.connect(mongoURL,
    {useNewUrlParser: true},
    (error, client) => {
        if (error) {
            return console.log("Unable to connect to database !\n", error)
        } else {
            // console.log("Connected successfully !\n")
            const db = client.db(databaseName)

            db.collection("users").updateOne({_id: new ObjectId("615998a516b01b149b60f2ca")}, {
                $inc: {
                    age: 5
                }
            }).then((result) => {
                console.log("Success ! ", result)
            }).catch((error) => {
                console.log("Error has occurred ! ", error)
            })


        }
    })

