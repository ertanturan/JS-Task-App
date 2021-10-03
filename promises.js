const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 4, 5, 8, 7, 6])
        reject("Things went bad !")
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log("success", result)
}).catch((error) => {
    console.log("Error..", error)
})