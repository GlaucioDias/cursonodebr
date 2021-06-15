/**
 * 0 - Obter usuário
 * 1 - Obter número de telefone de um usuário a partir de seu Id
 * 2 - Obter o endereço do usuário pelo Id
 */

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Paulo',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        ddd: 11,
        telefone: '988776655'
      })
    }, 2000);

  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Dos bobos',
      numero: 0
    })
  }, 2000);
}

// Adicionar a palavra async -> automaticamente ela returnará uma Promise
async function main() {
  try {
    console.time('tempo-promise')
    const usuario = await obterUsuario()

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)      
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
         Nome: ${usuario.nome}
         Endereço: ${endereco.rua}, Nro ${endereco.numero}
         Telefone: (${telefone.ddd}) ${telefone.telefone}
       `)
    console.timeEnd('tempo-promise')
  } catch (error) {
    console.error(error)
  }
}

main()

