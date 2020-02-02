const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const dataBase = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '321',
      name: 'Joca',
      password: 'bananas',
      email: 'joca@gmail.com',
      entries: 0,
      joined: new Date(),
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(dataBase.users);
})

app.post('/signin', (req, res) => {
  bcrypt.compare("songoku", '$2a$10$RYtAPMkDbJmIiCX2Wew37.nz1.L.Zukd/Nsu1xduMFYpXA4D1LWa.', function(err, res) {
    console.log("first guess", res)
  });
  bcrypt.compare("veggies", '$2a$10$RYtAPMkDbJmIiCX2Wew37.nz1.L.Zukd/Nsu1xduMFYpXA4D1LWa.', function(err, res) {
    console.log("second guess", res)
  });
  if (req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
})

app.post('/register', (req, res) => {
  // bcrypt.hash("hamburguer", null, null, function(err, hash) {
  //   console.log(hash);
  // });
  const { email, password, name} = req.body;
  dataBase.users.push(
    {
      id: '125',
      name: name,
      email: email,
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

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }  
  })
  if(!found){
    res.status(400).json("not found");
  }
})

app.listen(3000, () => {
  console.log("working on port 3000!");
})