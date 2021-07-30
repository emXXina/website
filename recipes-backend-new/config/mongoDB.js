const username = "finnupa";
const password = "4tRMOiLuqssa9cUe5de5";
const database = "recipes";

module.exports = `mongodb://${username}:${password}@finnupa.de:27017/?authSource=${database}`;