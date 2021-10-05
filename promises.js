const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}
//
//
// add(1, 2).then((sum) => {
//     console.log(sum)
//     add(sum, 2).then((secondSum) => {
//         console.log(secondSum)
//     }).catch((error) => {
//         console.log(error)
//     })
// }).catch((e) => {
//     console.log(e)
// })

add(1, 2).then((sum) => {
    console.log(sum)
    return add(sum, 5)
}).then((secondSum) => {
    console.log(secondSum)
}).catch((error) => {
    console.log(error)
})
