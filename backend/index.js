// const http = require("http");
const express = require("express");
const app = express();

app.use(express.json());
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   res.end(JSON.stringify(notes));
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello Nurul!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (req, res) => {
  //find the max id to help in generating the id for the new added content
  //map() in this creates a new array consisting all the ids
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
