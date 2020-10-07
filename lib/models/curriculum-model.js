const pool = require('../utils/pool');
const CurriculumComment = require('./curriculum-comment');

module.exports = class CurriculumProject {
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
  
    return new CurriculumProject(rows[0]);
  }
  // Read - find()
  static async find() {
    const { rows } = await pool.query(`
    SELECT * FROM curriculum_projects`);
    return rows.map((row) => new CurriculumProject(row));
  }

  // Read - findById()
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT curriculum_projects.*, array_to_json(array_agg(curriculum_comments.comment)) AS comments FROM curriculum_projects
      JOIN curriculum_comments
      ON curriculum_comments.curriculum_id=curriculum_projects.curriculum_id
      WHERE curriculum_projects.curriculum_id=$1
      GROUP BY curriculum_projects.curriculum_id`,
      [id]
    );
    
    if(rows[0]){
      const initialReturn = new CurriculumProject(rows[0]);
      
      const comments = rows[0].comments.map(comment => new CurriculumComment(comment));

      return { ...initialReturn, comments };
    } else {
      const { rows } = await pool.query('SELECT * FROM curriculum_projects WHERE curriculum_projects.curriculum_id=$1', [id]);
      return new CurriculumProject(rows[0]);
    }
  } 



  // Update - updateById()
  static async updateById(project, curriculumId) {
    const { rows } = await pool.query(`
    UPDATE curriculum_projects
    SET title=$1, github_link=$2, "description"=$3, "group"=$4, cohort=$5, tags=$6, deployed_back_end=$7, deployed_front_end=$8
    WHERE curriculum_id=$9
    RETURNING *
    `, [project.title, project.githubLink, project.description, project.group, project.cohort, project.tags, project.deployedBackEnd, project.deployedFrontEnd, curriculumId]);

    if(!rows[0]) return null;
    else return new CurriculumProject(rows[0]);
  }

  // Delete - deleteById()
  static async deleteById(curriculumId) {
    const { rows } = await pool.query(`
    DELETE FROM curriculum_projects
    WHERE curriculum_id=$1
    RETURNING *`, [curriculumId]);

    if(!rows[0]) return null;
    else return new CurriculumProject(rows[0]);
  }
};
