const PortfolioProject = require('../models/portfolio-model');
const PortfolioComment = require('../models/portfolio-comment');
const CurriculumProject = require('../models/curriculum-model');
const CurriculumComment = require('../models/curriculum-comment');
const chance = require('chance').Chance();

module.exports = async({ portfolioCount = 5, portfolioCommentCount = 50, curriculumCount = 5, curriculumCommentCount = 50 } = {}) => {
  const courseModules = ['Foundations-1', 'Foundations-2', 'Career-Track-1', 'Career-Track-2'];
  const languages = ['JavaScript', 'HTML', 'CSS', 'Python', 'Ruby', 'C++', 'C#', 'Java'];
  const emails = ['yahoo.com', 'gmail.com', 'msn.com', 'outlook.com', 'hotmail.com'];
  const comments = ['Awesome project idea!', 'Hi! Would love to collaborate with you!', 'Cool project!!', 'Love it!!'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  
  const portfoliosToInsert = [...Array(portfolioCount)]
    .map(() => ({
      ownerEmail: `${chance.first()}@${chance.pickone(emails)}`,
      title: `The ${chance.animal()} Project`, 
      primaryLanguage: chance.pickone(languages), 
      date: `${chance.integer({ min: 2000, max: 2020 })}-${chance.integer({ min: 1, max: 12 })}-${chance.integer({ min: 1, max: 27 })}`, 
      githubLink: 'https://github.com/project-name', 
      description: 'Project description', 
      collaborators: [`${chance.name()}`,  ` ${chance.name()}`,  ` ${chance.name()}`,  ` ${chance.name()}`], 
      open: chance.bool() 
    }));

  const insertedPortfolios = await Promise.all(portfoliosToInsert.map(portfolio => PortfolioProject.insert(portfolio)));
  
  const portfolioCommentsToInsert = [...Array(portfolioCommentCount)]
    .map(() => ({
      ownerEmail: `${chance.first()}@${chance.pickone(emails)}`,
      comment: chance.pickone(comments),
      portfolioId: chance.pickone(insertedPortfolios).portfolioId
    }));
 
  // Insert Portfolio Comments
  await Promise.all(portfolioCommentsToInsert.map(comment => PortfolioComment.insert(comment)));

  const curriculumsToInsert = [...Array(curriculumCount)]
    .map(() => ({
      title: `The ${chance.animal()} Project`,
      githubLink: 'https://github.com/project-name',
      description: 'Project description',
      group: [`${chance.name()}`,  ` ${chance.name()}`,  ` ${chance.name()}`,  ` ${chance.name()}`],
      cohort: `${chance.pickone(seasons)} ${chance.integer({ min: 2010, max: 2020 })}`,
      tags: chance.pickset(courseModules, 1),
      deployedBackEnd: 'my-project-be@herokuapp.com',
      deployedFrontEnd: 'https://my-project-fe.netlify.app/'
    }));
  
  const insertedCurriculums = await Promise.all(curriculumsToInsert.map(curriculum => CurriculumProject.insert(curriculum)));  

  const curriculumCommentsToInsert = [...Array(curriculumCommentCount)]
    .map(() => ({
      ownerEmail: `${chance.first()}@${chance.pickone(emails)}`,
      comment: chance.pickone(comments),
      curriculumId: chance.pickone(insertedCurriculums).curriculumId
    }));
 
  // Insert Curriculum Comments
  await Promise.all(curriculumCommentsToInsert.map(comment => CurriculumComment.insert(comment)));
};
