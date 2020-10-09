const { getRepoData, getContributors, getPrimaryLanguage, getDate } = require('./fetches');

const getPortfolioData = async(url, req) => {
  try {
    const makeArray = req.body.url.split('/');
    const getEndPoint = makeArray.splice((makeArray.length - 2));

    const data = await getRepoData(getEndPoint);
      
    const contributorsNames = await getContributors(data);

    const primaryLanguage = await getPrimaryLanguage(data);

    const now = getDate();

    const insertPortfolio = {
      ownerEmail: req.user.email,
      title: data.name, 
      primaryLanguage: primaryLanguage[0], 
      date: now, 
      githubLink: req.body.url, 
      description: !req.body.description && 'describe your project here!', 
      collaborators: contributorsNames, 
      open: true 
    };

    return insertPortfolio;

  } catch(error) {
    throw new Error(error);
  }
};

const getCurriculumData = async(url, req) => {
  try {
    const makeArray = req.body.url.split('/');
    const getEndPoint = makeArray.splice((makeArray.length - 2));

    const data = await getRepoData(getEndPoint);
      
    const contributorsNames = await getContributors(data);

    const primaryLanguages = await getPrimaryLanguage(data);

    const insertPortfolio = {
      title: data.name,
      githubLink: req.body.url,
      description: req.body.description || 'describe your project here!',
      group: contributorsNames,
      cohort: (req.body.cohort || 'Put your cohort here!'),
      tags: primaryLanguages,
      deployedBackEnd: (req.body.deployedBackEnd || 'Put a link to your back end here!'),
      deployedFrontEnd: (data.homepage || 'Put a link to your front end here!')
    };

    return insertPortfolio;

  } catch(error) {
    throw new Error(error);
  }
};


module.exports = { getPortfolioData, getCurriculumData };
