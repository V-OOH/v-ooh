// Grupos
const grupos = ["ZONA A", "ZONA B", "ZONA C", "ZONA D"];
const componentes = ["CPU", "RAM", "DISCO",]

const valores = [
  [2, 2, 2, 2],
   [1, 0, 3, 3],
   [2, 2, 1, 3],
];

const data = {
  labels: grupos,
  datasets: [
    {
      label: componentes[0],
      backgroundColor: "#564592",
      data: valores[0],
    },
    {
      label: componentes[1],
      backgroundColor: "#724CF9",
      data: valores[1],
    },
    {
      label: componentes[2],
      backgroundColor: "#EDF67D",
      data: valores[2],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: "Comparação Grupo x Alertas de componentes",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Zonas",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Alertas",
        },
      },
    },
  },
};

const chart = document.getElementById("comparacao-grupo-alertas");

const chartJs = new Chart(chart, config, data);


  const ctx = document.getElementById('graficoHardware');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['CPU', 'RAM', 'Disco', 'Rede'],
      datasets: [{
        label: 'Dados',
        data: [36, 25, 6, 87],
        backgroundColor: 'rgba(139, 92, 246, 0.45)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Quantidade de alertas por componentes'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: '#e5e5e5'
          }
        },
        y: {
          grid: {
            color: '#e5e5e5'
          }
        }
      }
    }
  });

  const ctxNovoGrafico = document.getElementById('uptime-zonas');

new Chart(ctxNovoGrafico, {
  type: 'line',
  data: {
    labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
    datasets: [
      {
        label: 'Zona A',
        data: [96, 95, 93, 91, 88, 85, 82, 80, 83, 82, 81, 81],
        borderColor: '#564592',
        backgroundColor: '#564592',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'Zona B',
        data: [98, 98, 97, 98, 98, 97, 97, 98, 97, 97, 98, 97],
        borderColor: '#724CF9',
        backgroundColor: '#724CF9',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'Zona C',
        data: [94, 94, 93, 92, 91, 91, 90, 90, 90, 90, 90, 90],
        borderColor: '#CA7DF9',
        backgroundColor: '#CA7DF9',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'Zona F',
        data: [96, 95, 60, 35, 15, 5, 0, 0, 0, 0, 0, 0],
        borderColor: '#ff4d6d',
        backgroundColor: '#ff4d6d',
        tension: 0.4,
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#8b8ba7',
          boxWidth: 18
        }
      },

      title: {
        display: true,
        text: 'Histórico de uptime por zona'
      }
    },

    scales: {
      x: {
        ticks: {
          color: '#7c7ca1'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      },

      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          color: '#7c7ca1',
          callback: function(value) {
            return value + '%';
          }
        },

        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  }
});
