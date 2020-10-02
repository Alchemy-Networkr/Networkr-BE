const express = require('express');
const app = express();

app.use(express.json());


app.use('/api/v1/portfolioProjects', require('./controllers/portfolio-route'));
app.use('/api/v1/curriculum', require('./controllers/curriculum-route'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
