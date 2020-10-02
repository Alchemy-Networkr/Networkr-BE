const pool = require('../utils/pool');

module.exports = class PortfolioComment {
  id;
  email;
  comment;
  portfolioId;

  constructor(comment) {
    this.id = comment.id;
    this.email = comment.email;
    this.comment = comment.comment;
    this.portfolioId = comment.portfolio_id;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO portfolio_comments (email, comment, portfolio_id) VALUES ($1, $2, $3) RETURNING *',
      [comment.email, comment.comment, comment.portfolioId]
    );

    return new PortfolioComment(rows[0]);
  }
};
