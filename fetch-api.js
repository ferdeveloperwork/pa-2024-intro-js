const apiKey = '7CCF19CC-71D1-4AE8-B1C0-047E508391D7';

const peticion = fetch('https://rest.coinapi.io/v1/exchanges', {
    headers: {
        'X-CoinAPI-Key': apiKey
    }
});

peticion
    .then(resp => {
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        return resp.json();
    })
    .then(data => {
        const filteredData = data.filter(exchange =>
            exchange.volume_1hrs_usd !== 0 && exchange.volume_1day_usd !== 0
        );

        const info = filteredData.map(exchange => ({
            nombreOperadora: exchange.name,
            cotizacionPorHora: exchange.volume_1hrs_usd,
            cotizacionDelDia: exchange.volume_1day_usd
        }));

        console.log(info);

        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(info, null, 2);
        pre.classList.add('shadowed');
        document.body.appendChild(pre);
    })
    .catch(error => {
        console.warn('Error al filtrar: ', error);
    });
