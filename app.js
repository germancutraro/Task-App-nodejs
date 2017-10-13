const express = require('express');
const bodyParser = require('body-parser');
// App
const app = express();
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static('public'));

const {port, engine} = require('./config'); //es6 destructuring

app.set('view engine', engine);

const db = require('./models/db');
const routes = require('./libs/routes')(app);

app.listen(port, err => console.log(err ? `Error on port ${port}` : `App running on port ${port}`));
