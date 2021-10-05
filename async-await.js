const doWork = async () => {
    const sum = await add(-5, 8)
    const secondSum = await add(sum, 50)
    const thirdSum = await add(secondSum, -3)
    return thirdSum
}


const add = (a, b) => {
    return new Promise((resolve, reject) => {

        if (a < 0 || b < 0) {
            return reject("Numbers must be non-negative")
        }

        resolve(a + b)

    })
}


// console.log(doWork())

doWork().then((result) => {
    console.log("Result : ", result)
}).catch((error) => {
    console.log("Error ", error)
})