const express = require('express');
const app = express();
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const path = require('path');
const pug = require('pug');
const request = require('superagent');
const cors = require('cors');

// Uses pug, and makes pug methods available as express middleware
// Can use pug.render, etc as res.render
app.set('view engine', 'pug');
app.set('views', path.resolve(`${__dirname}/../views`));


app.use(express.json());
app.use(require('cookie-parser')());
app.use(cors());


app.get('/', authMiddleware, (req, res) => res.redirect('/api/v1/home'));

// app.listen(7890)

app.use('/api/v1', require('./controllers/pages'));
app.use('/api/v1/portfolioProjects', require('./controllers/portfolio-route'));
app.use('/api/v1/portfolioComments', require('./controllers/portfolio-comment-route'));
app.use('/api/v1/curriculumComments', require('./controllers/curriculum-comment-route'));
app.use('/api/v1/curriculumProjects', require('./controllers/curriculum-route'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
