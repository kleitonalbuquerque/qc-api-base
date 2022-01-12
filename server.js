const api_log = require("./log").log;
const api_controller = require("./controller");
const service = require("./services");
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["*"],
});

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(api_log);
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get(
  "/api-base/criar-template",
  // service.validarToken,
  api_controller.buscarTemplate
);

exports.server = server;
