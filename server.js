const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

//Connect Database
connectDB();

app.use(express.json({extended: false}));

app.enable('trust proxy');

// app.get('/', (req, res) => res.send('API running'));


app.use(cors()); // Access-Control-Allow-Origin
app.options('*', cors());

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//serve front in porduction
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'./client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname,'./client/build/index.html'),
        function (err) {
          res.status(500).send(err)
        }
    )
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}...`);
})
