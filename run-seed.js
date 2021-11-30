const data = require("./db/data/development-data/index");
const seed = require("./seed");

const db = require("./db/connection");

seed(data).then(() => db.end());
