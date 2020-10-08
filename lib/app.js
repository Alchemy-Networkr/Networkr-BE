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

app.post('/api/v1/insertPortfolio', authMiddleware, async(req, res, next) => {
  try {
    const makeArray = req.body.url.split('/');
    const getEndPoint = makeArray.splice((makeArray.length - 2));
    const data = await request.get(`https://api.github.com/repos/${getEndPoint[0]}/${getEndPoint[1]}`)
      .set('User-Agent', 'Networkr-BE');
    
    const contributorsData = await request.get(data.body.contributors_url);

    const contributorsNames = contributorsData.map(contributor => contributor.login);



    const insertPortfolio = {
      ownerEmail: req.user.email,
      title: data.body.name, 
      primaryLanguage: 'js', 
      date: 'something', 
      githubLink: req.body.url, 
      description: (req.body.description || 'describe your project here!'), 
      collaborators: contributorsNames, 
      open: true 
    };

    console.log(insertPortfolio);
    res.json(insertPortfolio);

  } catch(error) {
    next(error);
  }
});


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
