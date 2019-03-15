const express = require('express');
const app = express();

app.use(express.static('static'));


require('./routes/question')(app);
require('./routes/user')(app);
require('./routes/general')(app);


app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('ERROR');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening: ${port}`);
});