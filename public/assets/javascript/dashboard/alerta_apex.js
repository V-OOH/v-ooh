// Gráfico de Linhas
let dados_kpi = [
    1, 5, 5,
    1, 5, 1, 3
];

var options = {
    series: [{
        data: dados_kpi
    }],
    chart: {
        type: 'area',
        width: "100%",
        height: "100%",
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        },

        sparkline: {
            enabled: true
        },
    },
    dataLabels: {
        // show: true
        enabled: false
    },

    fill: {
        colors: ["#c6ff33"]
    },
};

var chart_kpi = new ApexCharts(document.querySelector("#line-kpi"), options);
chart_kpi.render();



// Gráfico de Linhas
let dados = [
    1, 5, 5,
    12, 8, 1, 3
];

var options2 = {
    series: [{
        name: "Quantidade de Alertas",
        data: dados
    }],
    chart: {
        type: 'area',
        background: 'transparent',
        width: "100%",
        height: "90%",
        // height: 200,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    // colors: "#c6ff33",
    dataLabels: {
        show: true
        // enabled: false
    },
    stroke: {
        curve: 'straight'
    },

    title: {
        text: 'Volume de Alertas',
        align: 'center'
    },
    labels: ['Abr 10', 'Abr 11', 'Abr 12', 'Abr 13', 'Abr 14', 'Abr 15', 'Abr 16'],
    xaxis: {
        type: 'date',
    },

    annotations: {
        yaxis: [
            {
                y: 9, // O valor onde a linha horizontal vai se posicionar
                borderColor: "var(--color-danger)", // Cor da linha (Vermelho para alerta/meta)
                strokeDashArray: 4, // Deixa a linha tracejada
                label: {
                    borderColor: "var(--color-danger)",
                    style: {
                        color: "var(--color-white)",
                        background: "var(--color-danger)",
                    },
                    text: "Máximo: 10", // Texto que aparece no balão
                },
            },
        ],
    },

    grid: {
        show: false,
    },

    fill: {
        colors: ["#c6ff33"],
    },

    legend: {
        horizontalAlign: 'left'
    }
};

var chart = new ApexCharts(document.querySelector("#graficoLine"), options2);
chart.render();
