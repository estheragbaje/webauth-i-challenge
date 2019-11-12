const db = require("../db-config.js");

module.exports = {
  addUser,
  find,
  findBy,
  findById,
  findAll
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findAll() {
  return db("users");
}
