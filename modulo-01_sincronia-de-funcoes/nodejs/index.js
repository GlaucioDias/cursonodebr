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

const usuarioPromise = obterUsuario()

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            id: usuario.id,
            nome: usuario.nome
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    });
  })
  .then(function (resultado) {
    // console.log('resultado', resultado)
    console.log(`
         Nome: ${resultado.usuario.nome}
         Endereço: ${resultado.endereco.rua}, Nro ${resultado.endereco.numero}
         Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
       `)
  })
  .catch(function (error) {
    console.error('Deu ruim', error)
  })



// obterUsuario(function resolverUsuario(error, usuario) {
//   if(error) {
//     console.error('Deu ruim no usuario', error)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if(error1) {
//       console.error('Deu ruim no telefone', error1)
//       return;
//     } 
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('Deu ruim no endereço', error2)
//       }
//       console.log(`
//         Nome: ${usuario.nome}
//         Endereço: ${endereco.rua}, Nro ${endereco.numero}
//         Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })

// })

