const express = require('express');
const app = express();
const { authMiddleware } = require('@alchemycodelab/auth-middleware');

app.use(express.json());
app.use(require('cookie-parser')());


app.get('/', authMiddleware, (req, res) => res.send(req.user));

// app.listen(7890)


app.use('/api/v1/portfolioProjects', require('./controllers/portfolio-route'));
app.use('/api/v1/portfolioComments', require('./controllers/portfolio-comment-route'));
app.use('/api/v1/curriculumComments', require('./controllers/curriculum-comment-route'));
app.use('/api/v1/curriculum', require('./controllers/curriculum-route'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
