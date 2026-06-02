const value = 75;
const max = 100;

// Cor padrão
let color = "#ff9b00";

let dados = [92, 90, 87, 92, 91, 90, 95, 90, 85];
let datas = [
  "2026-04-07",
  "2026-04-11",
  "2026-04-15",
  "2026-04-19",
  "2026-04-23",
  "2026-04-27",
  "2026-04-30",
  "2026-05-01",
  "2026-05-04",
];

/**
 * Realiza o fetch dos dados direto do client S3
 *
 * @author Marley de S. Santos
 */
const fetchData = () => {
  fetch("url")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};

/**
 * Pontuação Operacional
 */
const pontuacao = () => {
  const opcoesPontuacao = {
    chart: {
      type: "radialBar",
      height: 230,
      fontFamily: "Open Sans",
    },
    series: [(value / max) * 100],
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
        track: {
          background: "#d3d3d3",
          strokeWidth: "100%",
        },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#331477",
            offsetY: 8,
            formatter: function () {
              return `${value}/${max}`;
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "butt",
    },
  };

  const chartPontuacao = new ApexCharts(
    document.querySelector("#pontuacao"),
    opcoesPontuacao,
  );
  chartPontuacao.render();
};

/**
 * Carrega os dados de disponibilidade (uptime)
 *
 * @author Marley de S. Santos
 */
const uptime = () => {
  let config = {
    series: [
      {
        name: "Disponibilidade",
        data: dados,
      },
    ],
    chart: {
      height: 350,
      width: "100%",
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: 95, // O valor onde a linha horizontal vai se posicionar
          borderColor: "var(--color-danger)", // Cor da linha (Vermelho para alerta/meta)
          strokeDashArray: 4, // Deixa a linha tracejada
          label: {
            borderColor: "var(--color-danger)",
            style: {
              color: "var(--color-white)",
              background: "var(--color-danger)",
            },
            text: "Meta: 95%", // Texto que aparece no balão
          },
        },
      ],
    },
    forecastDataPoints: {
      count: 3, // Últimos valores representam a linha de projeção
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: datas,
      tickAmount: 10,
      labels: {
        formatter: function (timestamp) {
          const data = new Date(timestamp);
          return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "short",
          });
        },
      },
    },
    title: {
      text: "Evolução da disponibilidade (últimos 30 dias)",
      align: "left",
      style: {
        fontSize: "18px",
        color: "#1e0b36",
      },
    },
    fill: {
      colors: ["#6D33FF"],
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#6D33FF"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };
  let uptimeChart = new ApexCharts(
    document.querySelector("#disponibilidade"),
    config,
  );
  uptimeChart.render();
};

/**
 * MTTR
 */
const mttr = () => {
  let configChartMTTR = {
    series: [
      {
        name: "",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 80],
      },
    ],
    chart: {
      height: "100%",
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },
    grid: {
      fill: {
        colors: ["#6d33ff"],
        type: "gradient",
      },
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: datas,
      labels: {
        formatter: function (timestamp) {
          const data = new Date(timestamp);
          return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "short",
          });
        },
      },
    },
    yaxis: {},
    fill: {
      colors: ["#6D33FF"],
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#6D33FF"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };
  var chart = new ApexCharts(document.querySelector("#mttr"), configChartMTTR);
  chart.render();
};

/**
 * Tendência de pontuação
 */
const tendenciaPontuacao = () => {
  const opcoesTendencia = {
    chart: {
      type: "line",
      height: 50,
      sparkline: {
        enabled: true,
      },
      animations: { enabled: true },
    },
    series: [
      {
        data: [10, 20, 15, 30, 25, 40],
      },
    ],
    colors: [color],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };

  const chartTendencia = new ApexCharts(
    document.querySelector("#tendencia-pontuacao-chart"),
    opcoesTendencia,
  );
  chartTendencia.render();
};

/**
 * Evento no documento ao cerregar a DOM
 *
 * Carrega as funções
 */
document.addEventListener("DOMContentLoaded", () => {
  pontuacao();
  uptime();
  mttr();
  tendenciaPontuacao();
});

/**
 * Busca os dados da dashboard de operação
 */
const buscarDados = () => {
  fetch();
};
