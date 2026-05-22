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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Gráfico de Rosca
var dados_rosca = [44, 56];

var options3 = {
    series: dados_rosca,
    labels: ["Remoto", "Presencial"],
    chart: {
        type: 'donut',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    title: {
        text: 'Modo de Intervenção',
        align: 'center'
    },
};

var chart_rosca = new ApexCharts(document.querySelector("#grafico-rosca"), options3);
chart_rosca.render()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var options4 = {
    series: [{
        name: 'Alertas',
        data: [10, 5, 15, 2]
    }],
    chart: {
        height: "100%",
        type: 'bar',
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        show: true,
        enabled: false,
        position: 'bottom',
        style: {
            fontSize: '12px',
            colors: ["#000"]
        }
    },

    xaxis: {
        categories: ["CPU", "DISCO", "RAM", "REDE"],
        position: 'bottom',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },

    },
    title: {
        text: 'Distribuição por Causa Raiz',
        align: 'center'
    },
    grid: {
        show: false,
    },

    plotOptions: {
        bar: {
            distributed: true,
            borderRadius: 10,
        }
    },

    colors: [
        '#564592',
        '#CA7DF9',
        '#F896D8',
        '#EDF67D'
    ]
};

var chart_bar = new ApexCharts(document.querySelector("#grafico-bar"), options4);
chart_bar.render();