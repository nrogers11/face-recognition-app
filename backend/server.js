const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'beni',
    password : '',
    database : 'smartbrain'
  }
});

// db.select('*').from('users').then(data => {
//   console.log(data);
// });

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
    res.json(dataBase.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
})

app.post('/register', (req, res) => {
  const { email, password, name} = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email,
    })
    .into('login')
    .returning('email')
    .then( loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
    .catch(error => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length){
        res.json(user[0])
      } else {
        res.status(400).json('Not found!')
      }
    })
    .catch(error => res.status(400).json('Error getting user!'));
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(error => res.status(400).json('Unable to get entries!'));
})

app.listen(3001, () => {
  console.log("working on port 3001!");
})