const allCurriculum = document.querySelectorAll('.curriculumButtons');
const allCurriculumAsArray = Array.from(allCurriculum);

allCurriculumAsArray.map(project => {
  project.addEventListener('click', () => {
    window.location = `/api/v1/All-Curriculum-Projects/${project.getAttribute('value')}`;
  });
});

