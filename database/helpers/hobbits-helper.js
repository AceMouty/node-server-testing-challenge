const db = require('../dbConfig');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit, 'id');
  return db('hobbits').where({id}).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db('hobbits').where({id: id}).del();
}

function getAll() {
  return db('hobbits');
}

function findById(id) {
  return null;
}
