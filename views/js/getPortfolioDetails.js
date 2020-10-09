const allPortfolios = document.querySelectorAll('.portfolioButtons');
const allPortfoliosAsArray = Array.from(allPortfolios);
allPortfoliosAsArray.map(project => {
  project.addEventListener('click', () => {
    window.location = `/api/v1/All-Portfolio-Projects/${project.getAttribute('value')}`;
  });
});


