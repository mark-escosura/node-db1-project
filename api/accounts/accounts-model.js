const database = require("../../data/db-config");

const getAll = () => {
  return database("accounts");
};

const getById = (id) => {
  return database("accounts").where("id", id).first();
};

const create = async (account) => {
  const [id] = await database("accounts").insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  await database("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = (id) => {
  return database("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
