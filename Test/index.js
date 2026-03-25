const http = require('http')
const url = require('url')

// http.createServer((req, res) => {}).listen(8000)

const myServer = http.createServer((req, res) => {
    // console.log(req)
    // console.log("----------------------------------------------------")
    // console.log(req.headers)

    const myUrl = url.parse(req.url)
    console.log(myUrl.pathname)

    switch(req.url){
        case "/" : res.end("Homepage");
        break;
        case "/about" : res.end("This is about section...")

        default:
            res.end("Default Page")
    }
    
})

myServer.listen(8000, () => {
    console.log("Server Started!")
})       
