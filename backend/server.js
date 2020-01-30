const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("hi, there!");
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