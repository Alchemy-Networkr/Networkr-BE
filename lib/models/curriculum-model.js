const pool = require('../utils/pool');

module.exports = class Curriculum_Project {
  curriculum_id;
  title;
  github_link;
  description;
  group;
  cohort;
  tags;
  deployed_back_end;
  deployed_front_end;

  constructor(row) {
    this.curriculumId = row.curriculum_id,
    this.title = row.title,
    this.githubLink = row.github_link,
    this.description = row.description,
    this.group = row.group,
    this.cohort = row.cohort, 
    this.tags = row.tags,
    this.deployedBackEnd = row.deployed_back_end,
    this.deployedFrontEnd = row.deployed_front_end;
  }

  // Create
  static async insert(project) {
    const { rows } = await pool.query(`
    INSERT INTO curriculum_projects (title, github_link, "description", "group", cohort, tags, deployed_back_end, deployed_front_end) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `, [project.title, project.githubLink, project.description, project.group, project.cohort, project.tags, project.deployedBackEnd, project.deployedFrontEnd]);
  
    return new Curriculum_Project(rows[0]);
  }
  // Read - find()
  static async find() {
    const { rows } = await pool.query(`
    SELECT * FROM curriculum_projects`);
    return rows.map((row) => new Curriculum_Project(row));
  }

  // Read - findById()
  static async findById(curriculumId) {
    const { rows } = await pool.query(`
    SELECT * FROM curriculum_projects
    WHERE curriculum_id=$1`, [curriculumId]);

    if(!rows[0]) return null;
    else return new Curriculum_Project(rows[0]);
  }

  // Update - updateById()
  static async updateById(project, curriculumId) {
    const { rows } = await pool.query(`
    UPDATE curriculum_projects
    SET title=$1, github_link=$2, "description"=$3, "group"=$4, cohort=$5, tags=$6, deployed_back_end=$7, deployed_front_end=$8
    WHERE id=$9
    RETURNING *
    `, [project.title, project.githubLink, project.description, project.group, project.cohort, project.tags, project.deployedBackEnd, project.deployedFrontEnd, curriculumId]);

    if(!rows[0]) return null;
    else return new Curriculum_Project(rows[0]);
  }

  // Delete - deleteById()
  static async deleteById(curriculumId) {
    const { rows } = await pool.query(`
    DELETE FROM curriculum_projects
    WHERE id=$1
    RETURNING *`, [curriculumId]);

    if(!rows[0]) return null;
    else return new Curriculum_Project(rows[0]);
  }
};
