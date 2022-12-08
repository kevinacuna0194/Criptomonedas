const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

/** Crear un promise */
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
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

        // console.log(cripto); /** {CoinInfo: {…}, RAW: {…}, DISPLAY: {…}} */
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}

/** Escribir en el objeto */
function leerValor(e) {
    // console.log(objBusqueda);
    objBusqueda[e.target.name] = e.target.value;

}

function submitFormulario(e) {
    e.preventDefault();

    /** Validar */
    const { criptomoneda, moneda } = objBusqueda;

    if (criptomoneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');

        return;
    }

    /** Consultar la API con los resultados */
    consultarAPI();
}

function mostrarAlerta(mensaje) {
    // console.log(mensaje);

    const existeError = document.querySelector('.error');

    if (!existeError) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('error');
        mensajeDiv.textContent = mensaje;

        formulario.appendChild(mensajeDiv);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    }
}

function consultarAPI() {

    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

function mostrarCotizacionHTML(cotizacion) {
    console.log(cotizacion);
}