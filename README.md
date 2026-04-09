------------------------------- PROJECT - 1 ---------------------------------------

REST API - Hybrid server

/path --> for computer users --> send HTML
/api/path --> for mobile users --> send JSON

GET /users - HTML document render
GET /api/users - List all users JSON 

GET /users/1 - Get the user with ID 1
GET /users/2 - Get the user with ID 2

Dynamic path parameters
GET /users/:id  --> dynamic 

POST /users - Create a new user

PATCH /user/1 - Edit the user with ID 1    

DELETE /user/1 - Delete the user with ID 1    


------------------------------- PROJECT - 2 ---------------------------------------

MONGODB

Schema --> define the structure
    schema --> model
    using the model we do crud operations.


------------------------------- PROJECT - 3 ---------------------------------------

Converting code according to MVC pattern

    
-------------------------------- SHORT-URL -----------------------------------------

url shortner project according to MVC pattern.

-- Rendering HTML on webpage(server-side rendering) --> without templating engine.
-- Let's show something on webpage using test route. (This code is for index.js)

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({})
    return res.end(`
        <html>
            <head> 
                <title> ALL URL's </title> 
            </head>
            <body> 
                <ol> 
                    ${allUrls.map(url =>
        `<li>
            <a href="/${url.shortId}">
            ${url.shortId}
                    </a> - 
                <a href="${url.redirectUrl}" target="_blank">
                    ${url.redirectUrl}
                    </a> - 
                    Visits: ${url.visitHistory.length}
                        </li>`
    ).join("")}
                </ol>
            </body>
        </html>
        
        `)
})

--Rendering HTML(server-side rendering) on home path --> Using templating engine(ejs)
 
app.get("/home", async (req, res) => {
    const allUrls = await URL.find({});
    const id = req.query.id || null;
    
    // return res.render("home") --> We can also pass variable here.
    return res.render("home", {
        urls: allUrls
    });
});


------------------------------- DISCORD-BOT ---------------------------------------

This is a discord bot project where ollama is implemented on system so that the bot can reply in realtime.

------------------------------- IMAGE-UPLOAD ---------------------------------------

Tried multer npm package to upload and store images.

--------------------------------- BLOG-APP -----------------------------------------

Full-stack blog app project.