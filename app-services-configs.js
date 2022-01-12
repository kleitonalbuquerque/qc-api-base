exports.configs = {
  api_base: {
    http_port: 6888,
    neo4j_lookup: {
      neo4j_bolt: "bolt://hmwinap02:18568",
      neo4j_user: "neo4j",
      neo4j_password: "admin"
    },

    security_api_http_server: "http://hml_seguranca_oauth.grupo.qualicorp",
    security_api_resource_uri: "/api/ValidarToken",
    baseUrl: "http://hmwinap02:18568",
    
    disable_token_auth: true
  },    
};

