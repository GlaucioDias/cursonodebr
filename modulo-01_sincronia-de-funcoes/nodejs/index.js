/**
 * 0 - Obter usuário
 * 1 - Obter número de telefone de um usuário a partir de seu Id
 * 2 - Obter o endereço do usuário pelo Id
 */

function obterUsuario(callback) {
  setTimeout(function() {
    return callback(null, {
      id: 1,
      nome: 'Paulo',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
    telefone: '988776655',
    ddd: 11
    })    
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
    rua: 'Dos bobos',
    numero: 0
    })    
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario)

}

obterUsuario(function resolverUsuario(error, usuario) {
  if(error) {
    console.error('Deu ruim no usuario', error)
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if(error1) {
      console.error('Deu ruim no telefone', error1)
      return;
    } 
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if(error2) {
        console.error('Deu ruim no endereço', error2)
      }
      console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua}, Nro ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  })
  
})

