// ID dinamico
document.addEventListener("DOMContentLoaded", () => {
  // Busca o ?id= na URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDisplay = urlParams.get('id');
  const spanIdentificador = document.getElementById("display_identificador");

  if (idDisplay && spanIdentificador) {
    spanIdentificador.innerHTML = `D${idDisplay}`;
  }
});

// grafico fluxo de dados
const labels = ['5min', '4min', '3min', '2min', '1min'];

const dlEth0 = [5.4, 6.1, 7.0, 8.2, 7.6, 9.1];
const ulEth0 = [2.1, 2.8, 3.2, 4.0, 3.5, 4.3];

// grafico conexoes
const labelsConexoes = ['ESTABLISHED', 'LISTEN', 'TIME_WAIT', 'CLOSE_WAIT', 'SYN_SENT'];
const Conexoes = [42, 12, 15, 5, 2];
const CONN_COLORS = ['#6D33FF', '#3DD68C', '#FFB547', '#FF4D6A', '#4A9EFF'];

//grafico latencia
const labelsLat = ['5m', '4m30', '4m', '3m30', '3m', '2m30', '2m', '1m30', '1m', '30s'];
const dadosLat = [15, 18, 14, 22, 16, 17, 20, 13, 19, 15];

//grafico estabilidade
const labelsEstab = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
const uptimeData  = [100,100,100,98.2,100,100,100,100,99.1,100,100,100,100,100,96.4,100,100,100,100,99.7,100,100,100,100];
const lossData    = [0.1,0.0,0.2,1.4,0.1,0.0,0.0,0.1,0.8,0.0,0.1,0.0,0.2,0.1,2.1,0.0,0.1,0.0,0.0,0.3,0.1,0.0,0.2,0.1];

//Fluxo de dados
new Chart(document.getElementById('graficoTp'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'eth0 ↓',
      data: dlEth0,
      borderColor: '#6D33FF',
      backgroundColor: '#6D33FF' + '14',
      fill: true,
      tension: 0.4,
      borderWidth: 1.8,
      pointRadius: 0
    },
    {
      label: 'eth0 ↑',
      data: ulEth0,
      borderColor: '#4A9EFF',
      borderDash: [5, 4],
      fill: false,
      tension: 0.4,
      borderWidth: 1.8,
      pointRadius: 0
    },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: { color: '#9B9B9B', font: { size: 9 } },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        beginAtZero: true,
        max: 14,
        ticks: {
          color: '#9B9B9B',
          font: { size: 9 },
          callback: (value) => value + ' MB/s'
        },
        grid: { color: 'rgba(0,0,0,0.06)' }
      }
    }
  }
});

//Latência
new Chart(document.getElementById('graficoLat'), {
  type: 'line',
  data: {
    labels: labelsLat,
    datasets: [{
      label: 'Latência (Ping)',
      data: dadosLat,
      borderColor: '#6D33FF',
      backgroundColor: '#6D33FF' + '14',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#6D33FF'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: '#9B9B9B', font: { size: 9 } },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          color: '#9B9B9B',
          font: { size: 9 },
          callback: (value) => value + ' ms'
        },
        grid: { color: 'rgba(0,0,0,0.06)' }
      }
    }
  }
});

// Conexões
new Chart(document.getElementById('graficoCon'), {
  type: 'bar',
  data: {
    labels: labelsConexoes,
    datasets: [{
      label: 'Conexões',
      data: Conexoes,
      backgroundColor: CONN_COLORS,
      borderRadius: 4,
      barThickness: 12,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 50,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#9B9B9B', font: { size: 10 } }
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#4A4A4A',
          font: { size: 11, weight: '700' }
        }
      }
    }
  }
});

  //Estabilidade
  new Chart(document.getElementById('graficoEstab'), {
    type: 'line',
    data: {
      labels: labelsEstab,
      datasets: [
        {
          label: 'Uptime (%)',
          data: uptimeData,
          borderColor: '#3DD68C',
          backgroundColor: '#3DD68C14',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 2,
          pointBackgroundColor: '#3DD68C',
          yAxisID: 'yUptime',
        },
        {
          label: 'Perda de Pacotes (%)',
          data: lossData,
          borderColor: '#FF4D6A',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          borderWidth: 1.8,
          pointRadius: 2,
          pointBackgroundColor: '#FF4D6A',
          yAxisID: 'yMetrics',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { mode: 'index' }
      },
      scales: {
        x: {
          ticks: { color: '#9B9B9B', font: { size: 9 }, maxTicksLimit: 12 },
          grid:  { color: 'rgba(0,0,0,0.05)' }
        },
        yUptime: {
          type: 'linear',
          position: 'left',
          min: 88,
          max: 100,
          ticks: { color: '#3DD68C', font: { size: 9 }, callback: v => v + '%' },
          grid:  { color: 'rgba(0,0,0,0.06)' }
        },
        yMetrics: {
          type: 'linear',
          position: 'right',
          min: 0,
          max: 10,
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: v => v + '%' },
          grid:  { drawOnChartArea: false }
        }
      }
    }
  });
