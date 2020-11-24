const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const routes = express.Router();

//connect DB
require('./db/db')();
//port
const port = 4000;

//enable cors
app.use(cors());
//body parser 
// app.use(bodyparser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//express json
app.use(express.json({extended: true}));

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/tasks'));

app.listen(port, () => {
  console.log("Server up");
});