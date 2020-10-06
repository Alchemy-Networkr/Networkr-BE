const pool = require('../utils/pool');

module.exports = class PortfolioProject {
    portfolioId;
    ownerEmail;
    title;
    primaryLanguage;
    date;
    githubLink;
    description;
    collaborators;
    open;

    constructor(row) {
      this.portfolioId = row.portfolio_id;
      this.ownerEmail = row.owner_email;
      this.title = row.title;
      this.primaryLanguage = row.primary_language;
      this.date = row.date;
      this.githubLink = row.github_link;
      this.description = row.description;
      this.collaborators = row.collaborators;
      this.open = row.open;
    }

    static async insert(project) {
      const { rows } = await pool.query(
        'INSERT INTO portfolio_projects (owner_email, title, primary_language, "date", github_link, "description", collaborators, "open") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [project.ownerEmail, project.title, project.primaryLanguage, project.date, project.githubLink, project.description, project.collaborators, project.open]
      );

      return new PortfolioProject(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM portfolio_projects WHERE portfolio_id=$1',
        [id]
      );

      return new PortfolioProject(rows[0]);
    } 

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM portfolio_projects'
      );

      return rows.map(row => new PortfolioProject(row));
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM portfolio_projects WHERE portfolio_id=$1 RETURNING *',
        [id]
      );

      return new PortfolioProject(rows[0]);
    }

    static async update(id, updatedProject) {
      const { rows } = await pool.query(
        `UPDATE portfolio_projects 
          SET title=$1, 
              primary_language=$2,
              github_link=$3,
              "description"=$4,
              collaborators=$5,
              "open"=$6
          WHERE portfolio_id=$7
          RETURNING *`,
        [updatedProject.title, updatedProject.primaryLanguage, updatedProject.githubLink, updatedProject.description, updatedProject.collaborators, updatedProject.open, id]
      );

      return new PortfolioProject(rows[0]);
    }
};
