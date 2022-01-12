const QMSSQL = require("@qualitech/qmssql");
const QNeo4j = require("@qualitech/qneo4j");
var appConfigs = require("./app-services-configs");

exports.db = new QNeo4j({
  url: appConfigs.configs.neo4j_bolt,
  username: appConfigs.configs.neo4j_user,
  password: appConfigs.configs.neo4j_password,
  autoCloseDriver: false,
  driverConfig: {
    maxConnectionLifeTime: 3 * 60 * 60 * 1000, //3hrs
    maxConnectionPoolSize: 10000,
    connectionAcquisitionTimeOut: 2 * 60 * 1000, //120s
  },
});
