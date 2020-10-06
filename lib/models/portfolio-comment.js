const pool = require('../utils/pool');

module.exports = class PortfolioComment {
  id;
  ownerEmail;
  comment;
  portfolioId;

  constructor(comment) {
    this.id = comment.id;
    this.ownerEmail = comment.owner_email;
    this.comment = comment.comment;
    this.portfolioId = comment.portfolio_id;
  } 

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO portfolio_comments (owner_email, comment, portfolio_id) VALUES ($1, $2, $3) RETURNING *',
      [comment.ownerEmail, comment.comment, comment.portfolioId]
    );

    return new PortfolioComment(rows[0]);
  }

  static async findAll(){
    const { rows } = await pool.query(
      'SELECT * FROM portfolio_comments'
    );

    return rows.map(comment => new PortfolioComment(comment));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM portfolio_comments WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    else return new PortfolioComment(rows[0]);
  }

  static async update(id, comment) {
    const { rows } = await pool.query(`
    UPDATE portfolio_comments
      SET comment=$1
      WHERE id=$2
      RETURNING *
    `, [comment, id]);

    return new PortfolioComment(rows[0]);
  }
};
