const logoutButton = document.getElementById('logout');
console.log(logoutButton);
logoutButton.addEventListener('click', () => {
  window.location = '/api/v1/Logout';
});

const home = document.getElementById('home');
console.log(home);
home.addEventListener('click', () => {
  window.location = '/api/v1/home';
});

const allPortfolioProjects = document.getElementById('allPP');

allPortfolioProjects.addEventListener('click', () => {
  window.location = '/api/v1/All-Portfolio-Projects';
});

const allCurriculumProjecs = document.getElementById('allCP');

allCurriculumProjecs.addEventListener('click', () => {
  window.location = '/api/v1/All-Curriculum-Projects';
});
