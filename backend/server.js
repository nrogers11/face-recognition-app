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
  res.send(dataBase.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password) {
    res.json("entrou");
  } else {
    res.status(400).json("error logging in");
  }
})

app.post('/register', (req, res) => {
  const { email, password, name} = req.body;

  dataBase.users.push(
    {
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    }
  );
  res.json(dataBase.users[dataBase.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }  
  })
  if(!found){
    res.status(400).json("not found");
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