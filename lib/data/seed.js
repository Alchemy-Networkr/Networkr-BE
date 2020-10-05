const PortfolioProject = require('../models/portfolio-model');
const PortfolioComment = require('../models/portfolio-comment');
const CurriculumProject = require('../models/curriculum-model');
const chance = require('chance').Chance();

module.exports = async({ portfolioCount = 5, portfolioCommentCount = 50, curriculumCount = 5 } = {}) => {
  const portfoliosToInsert = [...Array(portfolioCount)]
    .map(() => ({
      title: chance.animal(), 
      primaryLanguage: chance.string({ length: 2 }), 
      date: `${chance.integer({ min: 2000, max: 2020 })}-${chance.integer({ min: 1, max: 12 })}-${chance.integer({ min: 1, max: 27 })}`, 
      githubLink: chance.domain(), 
      description: chance.sentence(), 
      collaborators: [chance.name(), chance.name(), chance.name()], 
      open: chance.bool() 
    }));

  const insertedPortfolios = await Promise.all(portfoliosToInsert.map(portfolio => PortfolioProject.insert(portfolio)));
  
  const portfolioCommentsToInsert = [...Array(portfolioCommentCount)]
    .map(() => ({
      email: chance.email(),
      comment: chance.sentence(),
      portfolioId: chance.pickone(insertedPortfolios).portfolioId
    }));
 
  const insertedPortfolioComments = await Promise.all(portfolioCommentsToInsert.map(comment => PortfolioComment.insert(comment)));

  const curriculumsToInsert = [...Array(curriculumCount)]
    .map(() => ({
      title: chance.animal(),
      githubLink: chance.domain(),
      description: chance.sentence(),
      group: [chance.name(), chance.name(), chance.name(), chance.name()],
      cohort: `${chance.word()} ${chance.year}`,
      tags: chance.pickset(['name1', 'name2', 'name3', 'name4'], 4),
      deployedBackEnd: chance.domain(),
      deployedFrontEnd: chance.domain()
    }));
  
  const insertedCurriculums = await Promise.all(curriculumsToInsert.map(curriculum => CurriculumProject.insert(curriculum)));  
};
