const express = require('express');
const app = express();
const PORT = process.env.PORT||3001
const path = require('path');
const notes = require("./db/db.json")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "public/notes.html"))
})

//app.post('./notes', (req, res) => {
    //res.sendFile(path.join(__dirname, "notes.html"))
//})

//app.post("/api/notes", (req, res) => {
  //  res.json()
//})

app.listen(PORT, () => 
console.log(`Listening on ${PORT}`))