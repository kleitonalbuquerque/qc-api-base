const QMSSQL = require("@qualitech/qmssql");
const QNeo4j = require("@qualitech/qneo4j");
var appConfigs = require("./app-services-configs");

const configs = appConfigs.configs.api_base

exports.disable_token_auth = configs.disable_token_auth

exports.neo4j_driver = {
  url_neo4j_bolt: configs.url_neo4j_bolt,
  neo4j_user: configs.neo4j_user,
  neo4j_password: configs.neo4j_password,
}

exports.security_api = {
  http_server: configs.security_api_http_server,
  resource_uri: configs.security_api_resource_uri,
}

exports.db = new QNeo4j({
  url: configs.neo4j_lookup.neo4j_bolt,
  username: configs.neo4j_lookup.neo4j_user,
  password: configs.neo4j_lookup.neo4j_password,
  autoCloseDriver: false,
  driverConfig: {
    maxConnectionLifeTime: 3 * 60 * 60 * 1000, //3hrs
    maxConnectionPoolSize: 10000,
    connectionAcquisitionTimeOut: 2 * 60 * 1000, //120s
  },
})