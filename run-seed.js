const data = require("./db/data/development-data");
const seed = require("./seed");

const db = require("./db/connection");

seed(data).then(() => db.end());
