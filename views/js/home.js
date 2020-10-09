const foundations1Projects = document.getElementById('foundations1');
const foundations2Projects = document.getElementById('foundations2');
const careerTrack1Projects = document.getElementById('careertrack1');
const careerTrack2Projects = document.getElementById('careertrack2');
const javascript = document.getElementById('javascript');
const htmlButton = document.getElementById('html');
const cssButton = document.getElementById('css');
const pythonButton = document.getElementById('python');



foundations1Projects.addEventListener('click', () => {
  window.location = '/api/v1/Foundations-1';
});

foundations2Projects.addEventListener('click', () => {
  window.location = '/api/v1/Foundations-2';
});

careerTrack1Projects.addEventListener('click', () => {
  window.location = '/api/v1/Career-Track-1';
});

careerTrack2Projects.addEventListener('click', () => {
  window.location = '/api/v1/Career-Track-2';
});

javascript.addEventListener('click', () => {
  window.location = '/api/v1/JavaScript';
});

htmlButton.addEventListener('click', () => {
  window.location = '/api/v1/HTML';
});

cssButton.addEventListener('click', () => {
  window.location = '/api/v1/CSS';
});

pythonButton.addEventListener('click', () => {
  window.location = '/api/v1/Python';
});

