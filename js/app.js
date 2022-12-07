const criptomonedasSelect = document.querySelector('#criptomonedas');

/** Crear un promise */
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();
});

function consultarCriptomonedas() {
    /** Esto nos va a dar, digamos, las 10 criptomonedas, que son las más importantes, las que más usuarios utilizan. Aquí puedes ver que ven un límite, le puedes cambiar a 5 o a 20. */
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data)) /** (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] */
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {

        console.log(cripto); /** {CoinInfo: {…}, RAW: {…}, DISPLAY: {…}} */
        const { FullName, Name } = cripto.CoinInfo;
        
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}