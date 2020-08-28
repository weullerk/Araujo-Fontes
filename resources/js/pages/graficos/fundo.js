var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Grafico de Fundos'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Dias'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Valores'
                }
            }]
        }
    }
};

$(document).ready(function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    $('#filtrarGrafico').on('submit', function() {
        var fundosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-fundos");
        var patrimoniosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-patrimonios/" + $('#dataInicial').val() + '/' + $('#dataFinal').val());
        loadGrafico(fundosXhr, patrimoniosXhr);
        return false;
    });

    var fundosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-fundos");
    var patrimoniosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-patrimonios");
    loadGrafico(fundosXhr, patrimoniosXhr);

    function loadGrafico(fundosXhr, patrimoniosXhr) {
        var promise = Promise.all([fundosXhr, patrimoniosXhr]).then((values) => {
            var fundos = values[0];
            var patrimonios = values[1];
            var parametros = getLabelsAndValues(patrimonios);

            config.data.labels = parametros.labels;

            parametros.values.forEach((values, index) => {
                let nomeFundo = fundos.filter(f => f.id == index);
                createLabels(nomeFundo[0].name, values);
            });

            window.myLine.update();
        });
    }

    function getLabelsAndValues(patrimonios) {
        var labels = [];
        var values = [];
        patrimonios.forEach(patrimonio => {
            let fullDate = patrimonio.date.split(' ');
            let date = fullDate[0].split('-').reverse().join('/');
            if (!labels.includes(date)){
                labels.push(date);
            }

            if (!Array.isArray(values[patrimonio.fundo_id])) {
                values[patrimonio.fundo_id] = [];
            }

            values[patrimonio.fundo_id].push(+patrimonio.value);
        });

        return { labels: labels, values: values };
    }

    function createLabels(name, data) {
        var colorNames = Object.keys(window.chartColors);
        var colorName = colorNames[config.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        var newDataset = {
            label: name,
            backgroundColor: newColor,
            borderColor: newColor,
            data: data,
            fill: false
        };

        config.data.datasets.push(newDataset);
        window.myLine.update();
    }
});
