import express from "express";
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const PORT = 3001;

let persons = [
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

  if(!filteredPerson) {
    return res.status(404).json({message: `Person with id ${id} NOT FOUND`});
  }

  res.json(filteredPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const { id }  = req.params;

  const findPersonById = persons.find((person) => person.id == id);

  if(!findPersonById) {
    return res.status(404).json({message: `Person with id ${id} NOT FOUND`});
  }

  const index = persons.indexOf(findPersonById);
  const deletedPerson = persons.splice(index,1);

  res.json({  
    message: `Person with id ${id} deleted successfully!`, 
    deleted: deletedPerson
  });
})

app.post('/api/persons', (req, res) => {
  // const body = req.body;

  const person = {
    id: Math.floor(Math.random() * 9999),
    name: req.body.name,
    number: req.body.number,
  }

  if(!req.body.name || !req.body.number) {
    return res.status(400).json({ error: "Name and Number are required"})
  }

  const findPersonByName = persons.find((person) => person.name === req.body.name)
  if(findPersonByName) {
    return res.status(409).json({error: `Person with name ${req.body.name} already exist!`});
  }

  persons.push(person)
  res.json(persons)
})

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
);