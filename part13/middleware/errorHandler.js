const Sequelize = require("sequelize");

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof Sequelize.DatabaseError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({ error: err.errors.map(e => e.message) });
  }
  res.status(500).json({ error: "Internal server error" });
};