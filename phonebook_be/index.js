const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((item) => item.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const totalPerson = persons.length;
  const dateTime = new Date();
  res.send(
    `<p>Phonebook has info for ${totalPerson} people</p> <br/> <p>${dateTime}</p>`
  );
});

const generateId = () => {
  const id = Math.random();
  return Math.floor(id + 4);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!(body.name && body.number) || !body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (persons.map((person) => person.name).includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  morgan(":method :url :status :res[content-body] - :response-time ms");
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
