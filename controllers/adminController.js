const { clearAllTables } = require('../db/queries');

async function clearAll(req, res) {
  try {
    await clearAllTables();
    res.send("All tables cleared successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error clearing tables");
  }
}

module.exports = { clearAll };