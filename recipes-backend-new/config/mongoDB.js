const username = "finnupa";
const password = "4tRMOiLuqssa9cUe5de5";
const database = "finnupa-de";

module.exports = {
    'url' : `mongodb://${username}:${password}@finnupa.de:27017/?authSource=${database}`,
    'database' : database
};