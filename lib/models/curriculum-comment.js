const pool = require('../utils/pool');

module.exports = class CurriculumComment {
  id;
  email;
  comment;
  curriculumId;

  constructor(comment) {
    this.id = comment.id;
    this.email = comment.email;
    this.comment = comment.comment;
    this.curriculumId = comment.curriculum_id;
  } 

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO curriculum_comments (email, comment, curriculum_id) VALUES ($1, $2, $3) RETURNING *',
      [comment.email, comment.comment, comment.curriculumId]
    );

    return new CurriculumComment(rows[0]);
  }

  static async findAll(){
    const { rows } = await pool.query(
      'SELECT * FROM curriculum_comments'
    );

    return rows.map(comment => new CurriculumComment(comment));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM curriculum_comments WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    else return new CurriculumComment(rows[0]);
  }

  static async update(id, comment) {
    const { rows } = await pool.query(`
    UPDATE curriculum_comments
      SET comment=$1
      WHERE id=$2
      RETURNING *
    `, [comment, id]);

    return new CurriculumComment(rows[0]);
  }
};
