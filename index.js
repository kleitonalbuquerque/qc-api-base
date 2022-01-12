var appConfigs = require("./app-services-configs");
var controller = require("./server");

async function startup() {
  console.log("Iniciando a aplicação api-ocorrencias");

  try {
    console.log("Iniciando o módulo api-ocorrencias web server");

    controller.server.listen(appConfigs.configs.http_port, function () {
      console.log(
        "%s módulo iniciado em %s",
        controller.server.name,
        controller.server.url
      );
    });
  } catch (err) {
    console.log("Erro ao iniciar api api-ocorrencias.");
    console.error(err);
    process.exit(1);
  }
}

startup();
