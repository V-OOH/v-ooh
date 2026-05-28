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
    height: "100%",
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
    text: 'Histórico de Alertas (Últimos 7 dias)',
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' }
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
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' }
  },
};

var chart_rosca = new ApexCharts(document.querySelector("#grafico-rosca"), options3);
chart_rosca.render()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Gráfico de Barras (Horizontal)

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
    text: 'Alertas por Tipo de Componente',
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' }
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var options24h = {
  chart: {
    type: 'scatter',
    height: 240,
    zoom: { enabled: true, type: 'xy' },
    toolbar: { show: false }
  },
  title: {
    text: 'Histórico de Alertas nas Últimas 24h',
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' }
  },

  // Mapeamento de cores: Amarelo para a primeira série (Atenção) e Vermelho para a segunda (Crítico)
  colors: ['#FFC107', '#DC3545'],

  series: [
    {
      name: "Atenção (59% - 80%)",
      // Pontos cujos valores de Y estão estritamente entre 59 e 80
      data: [
        [16.4, 72.8], [21.7, 64.1], [25.4, 66.7], [19.0, 64.1], [10.9, 61.6], [13.6, 67.2],
        [10.9, 77.9], [16.4, 63.6], [13.6, 59.8], [27.1, 64.9], [13.6, 68.5], [10.9, 72.3],
        [16.4, 75.6], [24.5, 77.2], [8.1, 71.0], [21.7, 63.6], [29.9, 62.8], [27.1, 61.1],
        [22.1, 64.1], [13.6, 59.0], [10.9, 59.0], [16.4, 59.0], [29.9, 59.0], [16.4, 59.0],
        [10.9, 59.0], [10.9, 59.0], [19.0, 59.0], [27.1, 59.0], [24.5, 59.0], [27.1, 59.0]
      ]
    },
    {
      name: "Crítico (80% - 100%)",
      // Pontos cujos valores de Y foram escalados para a zona crítica (ex: acima de 80)
      data: [
        [10.9, 80.0], [14.2, 84.5], [18.5, 92.1], [22.4, 88.7], [2.1, 95.0], [6.1, 81.3]
      ]
    }
  ],
  xaxis: {
    type: 'numeric',
    min: 0,
    max: 24,
    tickAmount: 12, // Linhas guias horizontais a cada 2 horas
    // title: { text: 'Horário do Disparo (0h às 24h)' },
    labels: {
      formatter: function (val) { return Math.floor(val) + 'h'; }
    }
  },
  yaxis: {
    min: 59,
    max: 100, // Expandido até 100% para cobrir a área total de estresse
    tickAmount: 8, // Divide o eixo vertical de forma simétrica
    title: { text: 'Uso do Componente (%)' },
    labels: {
      formatter: function (val) { return parseFloat(val).toFixed(0) + '%'; }
    }
  },
  // Adiciona linhas de preenchimento no fundo para o Rubens ver visualmente onde mudam as zonas
  annotations: {
    yaxis: [
      {
        y: 80,
        borderColor: '#DC3545',
        label: {
          borderColor: '#DC3545',
          style: { color: '#fff', background: '#DC3545' },
          text: 'Início da Zona Crítica (80%)'
        }
      }
    ]
  },
  tooltip: {
    x: {
      formatter: function (val) { return "Horário: " + val.toFixed(1) + "h"; }
    },
    y: {
      formatter: function (val) { return val.toFixed(1) + "% de uso"; }
    }
  },
  legend: { position: 'top' }
};

var chart24h = new ApexCharts(document.querySelector("#grafico-scarte-plot"), options24h);
chart24h.render();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var optionsVertical = {
  series: [{
    name: 'Atenção',
    data: [24, 15, 31, 7, 16, 13, 11, 10, 5, 9]
  }, {
    name: 'Crítico',
    data: [23, 22, 0, 22, 13, 4, 12, 9, 5, 0]
  }],
  colors: ['#FFC107', '#DC3545'],
  chart: {
    type: 'bar',
    height: 480,
    stacked: true,
    toolbar: false
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        total: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  title: {
    text: 'Top 10 Displays com Mais Alertas',
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' }
  },
  xaxis: {
    categories: ['S012', 'L010', 'N010', 'OE023', 'S112', 'S011', 'N013', 'L012', 'S002', 'S001'],
    labels: {
      formatter: function (val) {
        return val
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetX: 40
  },
};

var chartV = new ApexCharts(document.querySelector("#grafico-bar-vertical"), optionsVertical);
chartV.render();