const request = require('superagent');
const { getRepoData, getContributors, getPrimaryLanguage, getDate } = require('./fetches');

module.exports = async(url, req) => {
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
      primaryLanguage, 
      date: now, 
      githubLink: req.body.url, 
      description: (req.body.description || 'describe your project here!'), 
      collaborators: contributorsNames, 
      open: true 
    };

    return insertPortfolio;

  } catch(error) {
    throw new Error(error);
  }
};

