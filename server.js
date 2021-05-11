const express = require("express");
const path = require("path");
const fs = require("fs");
const noteList = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Fetches all of the notes from the db
app.get("/api/notes", (req, res) => {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

// Posts a new note when the form is submitted
app.post("/api/notes", (req, res) => {
    let note = req.body;

    noteList.push(note);
    note.id = noteList.indexOf(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));

    res.json(note);
})

// Homepage route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Note page route
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Redirect route
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));