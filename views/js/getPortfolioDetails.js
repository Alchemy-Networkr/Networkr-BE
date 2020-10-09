const allPortfolios = document.querySelectorAll('.portfolioButtons');
const allPortfoliosAsArray = Array.from(allPortfolios);
console.log(allPortfoliosAsArray);
allPortfoliosAsArray.map(project => {
  project.addEventListener('click', () => {
    window.location = `/api/v1/All-Portfolio-Projects/${project.getAttribute('value')}`;
    console.log('your there');
  });
});


