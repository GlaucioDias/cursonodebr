const service = require('./service');

Array.prototype.meuReducee = function(cb, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index <= this.length -1; index++) {
        valorFinal = cb(valorFinal, this[index], this)
    }
    return valorFinal;
}

async function main() {
    try {
        const { results } = await service.obterPessoas(`a`)

        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // })

        const minhaLista = [
            ['Glaucio', 'Dias'],
            ['NodeBR', 'Nerdzão']
        ]

        const total = minhaLista.meuReducee((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')

        console.log('total', total)
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()