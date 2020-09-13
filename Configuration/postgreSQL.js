"use strict";

const pgp = require("pg-promise")({});
const cn = "postgres://postgres:greentomato@schulichvelocitydb.cpzvldpktisu.us-east-2.rds.amazonaws.com:5432/postgres";
const database = pgp(cn);

module.exports = database;