const request = require('superagent');

const getRepoData = async(endPoints) => {

  const data = await request.get(`https://api.github.com/repos/${endPoints[0]}/${endPoints[1]}`)
    .set('User-Agent', process.env.MY_GITHUB_TOKEN);

  return data.body;
};

const getContributors = async(data) => {
  const contributorsData = await request.get(data.contributors_url)
    .set('User-Agent', process.env.MY_GITHUB_TOKEN);
      
  return contributorsData.body.map(contributor => contributor.login);
};

const getPrimaryLanguage = async(data) => {
  const languageData = await request.get(data.languages_url)
    .set('User-Agent', process.env.MY_GITHUB_TOKEN);
  
  return Object.keys(languageData.body);
};

const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
};

module.exports = {
  getRepoData, 
  getContributors, 
  getPrimaryLanguage,
  getDate
};
