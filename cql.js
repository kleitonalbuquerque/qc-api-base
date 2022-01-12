exports.cql = {
  cqlCriarOcorrencia(idContrato, numeroProtocolo, login, descricao, dataAtual, motivo, operador, textoDetalhe) {
    const params = { 
      idContrato, 
      numeroProtocolo, 
      login, 
      descricao,
      dataAtual, 
      motivo,
      operador,
      textoDetalhe
    }

    const cypher = `
      MATCH(c:ContratoAdesao) WHERE id(c) = $idContrato
      OPTIONAL MATCH(p:Protocolo) WHERE p.numero = $numeroProtocolo 
      
      CREATE(o:Ocorrencia{
        login: $login,
        descricao: $descricao,
        dataInicializacao: $dataAtual,
        motivo: $motivo
      })
      
      CREATE(d:DetalheOcorrencia{
        dataDetalhe: $dataAtual,
        operador: $operador,
        textoDetalhe: $textoDetalhe
      })

      MERGE(o)-[:SOLICITADO_PARA]->(c)
      MERGE(d)-[:DETALHADO_PARA]->(o) 
      
      FOREACH(ignoreMe IN CASE WHEN p.numero IS NOT NULL THEN [1] ELSE [] END | 
        MERGE(o)-[:EVENTO_DE]->(p)
      )

      return c 
    `;

    return { params, cypher }
  },
  cqlBuscaIdContratoPorMatricula(matricula) {
    const params = { matricula }

    const cypher = `
      MATCH(c:ContratoAdesao) 
      WHERE c.matricula = $matricula
      RETURN id(c) as id
    `;

    return { params, cypher };
  },
}
