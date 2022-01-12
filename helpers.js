const fs = require('fs');

exports.formataNum = (num) => parseFloat((num).toFixed(2))

exports.objParaString = (obj) => JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:')

exports.gravarLogError = async (error) => {
  fs.appendFile("./errors.txt", `${error} -- Data atual: ${new Date()} \n`, (err) => {
    if(err)
      console.log(err);
  })
} 