const express = require('express');
const app = express();
const PORT = process.env.PORT||3001
const path = require('path');
const notes = require("./db/db.json")
const fs = require("fs");
const { v4: uuidv4} = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "public/notes.html"))
})

//app.post('./notes', (req, res) => {
    //res.sendFile(path.join(__dirname, "notes.html"))
//})

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err)
        } else return res.json(JSON.parse(data))
    }
)});

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4()
        };
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) => err ? console.error(err) : console.log("done"))
            }
        })
    }
})

app.listen(PORT, () => 
console.log(`Listening on ${PORT}`))