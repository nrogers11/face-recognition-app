const express = require('express');

const app = express();

app.use(express.json());

const dataBase = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'hamburguer',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '321',
      name: 'Joca',
      email: 'joca@gmail.com',
      password: 'batata',
      entries: 0,
      joined: new Date(),
    }
  ]
}

app.get('/', (req, res) => {
  res.send("hi, there!");
})

app.post('/signin', (req, res) => {
  if (req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password) {
    res.json("entrou");
  } else {
    res.status(400).json("error logging in");
  }
})

app.listen(3000, () => {
  console.log("working on port 3000!");
})

/*
/                 --> res = this is working
/signiin          --> POST = success / fail
/register         --> POST = user (object)
/profile/:userId  --> GET = user
/image            --> PUT --> user (updated or something)

*/