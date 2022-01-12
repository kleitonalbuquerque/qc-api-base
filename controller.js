const service = require("./services");
const help = require("./helpers");
const { readFile } = require("fs");
const config = require("./config.js");
const { db } = config;

exports.buscarTemplate = async function (req, res, next) {
  const cql = cqlBuscarTemplate();
  result = db.execute(cql);
  res.send(result);
};

function cqlBuscarTemplate() {
  const params = {};
  const cypher = `Match (p:Person) return p ORDER BY p.name`;
  return { params, cypher };
}
