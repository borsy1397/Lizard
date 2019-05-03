const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(session({
  secret: 'hdsafhasldfhsldf',
  cookie: {
    maxAge: 120000
  },
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.locals = {};
  res.locals.error = [];
  return next();
});

require('./model/Response');
require('./model/User');
require('./model/Question');


require('./routes/question')(app);
require('./routes/user')(app);
require('./routes/general')(app);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('ERROR');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening: ${port}`);
});