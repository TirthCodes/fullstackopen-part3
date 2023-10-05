import express from "express";

const app = express();

app.use(express.json());

const PORT = 3001;

const persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (_req, res) => res.send('Hello World!'))

app.get('/info', (_req, res) => {
  res.set('Content-Type', 'text/html');

  const currentDate = new Date(Date.now())

  const phonebookInfo = `<p>
    Phonebook has info for ${persons.length} people
    <br/>
    ${currentDate.toString()}
  </p>`

  res.send(phonebookInfo);
})

app.get('/api/persons', (_req, res) => res.json(persons)); 

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;

  const filteredPerson = persons.find((person) => person.id == id);

  if(filteredPerson === undefined) {
    res.status(404).json({message: `Person with id ${id} NOT FOUND`});
  }

  res.json(filteredPerson)
})

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
);