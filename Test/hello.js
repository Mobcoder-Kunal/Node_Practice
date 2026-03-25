const test1 = require('http')
const test2 = require('crypto')
const test3 = require('fs')

// console.log(test1)
// console.log("-------------------------------------------------")
// console.log(test2)
// console.log("-------------------------------------------------")
// console.log(test3)
// console.log("-------------------------------------------------")

// test3.writeFile("./test.txt", "Hello bhai...", (err) => err ? console("Error occurred: ", err)
//     : console.log("File created!    ")
// )

const writeReturnValue = test3.writeFile("./test.txt", "Hello bhai...", (err) => {          // Not returning anything here just creating file or consoling error.
    if (err) console.log("Error occurred: ", err)
    else console.log("File created!    ")
})

// console.log(writeReturn)        iski return value undefined hai


const readReturnValue = test3.readFile("./test.txt", (err, data) => err ? console.log(err) : console.log(data))
