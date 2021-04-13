//dependencies
const express = require('express');
const http = require('http')
const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/bookings',(req, res) => res.sendFile(path.join(__dirname, './public/bookings.html')));

app.get('/reservations',(req, res) => res.sendFile(path.join(__dirname, './public/reservations.html')));

app.get('/api/reservations',(req,res)=>{
    fs.readFile('db/db.json', 'utf8', (err, data) => {
    console.log(data)
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    return res.json(parsedData);
  })
})

app.post('/api/reservations', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
    console.log(req.body);

    fs.readFile('db/db.json', 'utf8', (err, data) => {
      console.log(data)
      let parsedData = JSON.parse(data);
      //so the logic is the id of the last object will be i+1 of the next object
      const newId = parseInt(parsedData[parsedData.length-1].id)+1;
      newReservation.id = newId;

      parsedData.push(newReservation);
      const stringedData = JSON.stringify(parsedData)

      fs.writeFile('db/db.json', stringedData, (err) => {
        if (err)
          console.log(err);
          else{
            return //res.json(newReservation);
          }
      })
    })
  })






app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));