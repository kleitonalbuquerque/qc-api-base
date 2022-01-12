const axios = require("axios")
const config = require("./config")
const queries = require("./cql")
const { db } = config

// AUTENTICAÇÃO
exports.validarToken = function (req, res, next) {
  if (config.disable_token_auth) return next()
  
  const token = req.header("token")
  const refresh_token = req.header("refresh_token")

  if (token === undefined) {
    res.send(401, {
      error_code: 401,
      status: false,
      message: "Acesso negado! (401)",
    });
    return next(false);
  } else {
    axios({
      method: "GET",
      baseURL: config.security_api.http_server + config.security_api.resource_uri,
      url: config.security_api.http_server + config.security_api.resource_uri,
      headers: {
        Accept: "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
        refresh_token: refresh_token,
      },
    }).then(function () {
      next();
    }).catch((e) => {
      res.send(401, {
        status: false,
        error_code: 401,
        message: "Acesso negado!"
      });
      return next(e)
    })
  }
}

// SERVICES
exports.criarOcorrencia = async (idContrato, numeroProtocolo, login, descricao, dataAtual, motivo, operador, textoDetalhe) => {
  try {
    let cql = queries.cql.cqlCriarOcorrencia(idContrato, numeroProtocolo, login, descricao, dataAtual, motivo, operador, textoDetalhe)
    let contrato = await db.execute(cql)
    if (!contrato) {
      return false
    }
    return true
  } catch (error) {
    throw error
  }
}

exports.buscaIdContratoPorMatricula = async (matricula) => {
  try {
    let cql = queries.cql.cqlBuscaIdContratoPorMatricula(matricula)
    let contrato = await db.execute(cql).first();
    return contrato
  } catch (error) {
    throw error;
  }
}