const service = require("./services");
const help = require("./helpers");
const { readFile } = require("fs");

exports.criarOcorrencia = async function (req, res, next) {
  try {
    let { 
      idContrato, 
      matricula,
      numeroProtocolo, 
      login, 
      descricao,
      motivo,
      operador,
      textoDetalhe
    } = req.body

    if(!idContrato || idContrato == null){
      const contratoId = await service.buscaIdContratoPorMatricula(matricula)
      if(contratoId){
        idContrato = contratoId.id
      }else{
        return res.send(400, {texto: "Matricula não encontrada"})
      }
    }

    const verificacao = verificarParametros(
      idContrato, 
      login, 
      descricao,
      motivo,
      operador,
      textoDetalhe
    )

    if(verificacao.valido){
      const ocorrencia = await service.criarOcorrencia(
        idContrato, 
        numeroProtocolo,
        login, 
        descricao,
        new Date().getTime(), 
        motivo,
        operador,
        textoDetalhe
      )
      if(ocorrencia){
        res.send(200, {texto: "Ocorrência criada!"})
      }else{
        res.send(500, {texto: "Erro ao criar ocorrência!"})
      }
    }else{
      res.send(400, {texto: verificacao.texto})
    }
  } catch (error) {
    console.log(error);
    help.gravarLogError(error);
    res.send(500, error);
  }
}

const verificarParametros = function(idContrato, login, descricao, motivo, operador, textoDetalhe) {
  let result = {valido: true, texto: ''}
  if(!idContrato && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro idContrato ou matricula'
  }
  if(!login && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro login'
  }
  if(!descricao && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro descricao'
  }
  if(!motivo && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro motivo'
  }
  if(!operador && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro operador'
  }
  if(!textoDetalhe && result.valido){
    result.valido = false
    result.texto = 'É necessário o parametro textoDetalhe'
  }
  return result
}