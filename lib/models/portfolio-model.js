const pool = require('../utils/pool');

module.exports = class PortfolioProject {
    portfolioId;
    title;
    primaryLanguage;
    date;
    githubLink;
    description;
    collaborators;
    open;

    constructor(row) {
      this.portfolioId = row.portfolio_id;
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
        'INSERT INTO portfolio_projects (title, primary_language, "date", github_link, "description", collaborators, "open") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [project.title, project.primaryLanguage, project.date, project.githubLink, project.description, project.collaborators, project.open]
      );

      return new PortfolioProject(rows[0]);
    }
};
