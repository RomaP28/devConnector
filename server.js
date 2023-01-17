const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connect Database
connectDB();

app.use(express.json({extended: false}));

app.enable('trust proxy');

app.get('/', (req, res) => res.send('API running'));


app.use(cors()); // Access-Control-Allow-Origin
app.options('*', cors());

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}...`);
})
