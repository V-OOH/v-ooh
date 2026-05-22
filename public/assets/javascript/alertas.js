// Gráfico de linhas KPI
const graficoKPI = document.getElementById('line-kpi').getContext('2d');
const graficoLineKpi = new Chart(graficoKPI, {
  type: 'line', // Tipo do gráfico
  data: {
    labels: ['', '', '', '', '', ''],
    datasets: [{
      // label: 'Quantidade de Alertas',
      data: [1, 5, 5, 12, 8, 1],
      borderColor: 'rgb(198, 255, 51)', // Cor da linha
      backgroundColor: 'rgb(198, 255, 51)', // Cor de preenchimento
      borderWidth: 2,
      tension: 0.3 // Suavidade da linha
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



// Gráfico de Linhas
const ctx = document.getElementById('graficoLine').getContext('2d');
const graficoLine = new Chart(ctx, {
  type: 'line', // Tipo do gráfico
  data: {
    labels: ['Abr 10', 'Abr 11', 'Abr 12', 'Abr 13', 'Abr 14', 'Abr 15'],
    datasets: [{
      label: 'Quantidade de Alertas',
      data: [1, 5, 5, 12, 8, 1],
      borderColor: 'rgb(198, 255, 51)', // Cor da linha
      backgroundColor: 'rgb(198, 255, 51)', // Cor de preenchimento
      borderWidth: 2,
      tension: 0.3 // Suavidade da linha
    }, {
      label: 'Limite',
      data: [10, 10, 10, 10, 10, 10],
      borderColor: 'red',
      borderDash: [5, 5],
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Volume de Alertas'
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Gráfico de Barras

const bar = document.getElementById('grafico-bar').getContext('2d');
const graficobar = new Chart(bar, {
  type: 'bar', // Define o tipo como barras
  data: {
    labels: ['CPU', 'Disco', 'Memória  RAM', 'Rede'],
    datasets: [{
      title: 'Distribuição por Causa Raiz',
      label: 'Atenção',
      data: [10, 5, 15, 2],
      backgroundColor: 'rgb(109, 51, 255)', 
      borderColor: 'rgb(109, 51, 255);',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Distribuição por Nível'
      },
    },

    scales: {
      y: {
        beginAtZero: true
      }
    }

  }
});


// Gráfico de Roscas

const rosca = document.getElementById('grafico-rosca').getContext('2d');
const meuGrafico = new Chart(rosca, {
    type: 'doughnut', // Define que é um gráfico de rosca
    data: {
        labels: ['Presencial', 'Remoto'],  
        datasets: [{
            label: '%',
            data: [40 , 60],
            backgroundColor: [
                'rgb(84, 145, 199)',
                'rgb(143, 155, 176)'
            ],
            borderColor: [
                'rgb(84, 145, 199)',
                'rgb(143, 155, 176)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', // AQUI: Define o tamanho do buraco (percentual do raio)
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Modo de Intervenção'
            }
        }
    }
});

// Gráfico de Barras Vertical

const bar_vertical = document.getElementById('grafico-bar-vertical').getContext('2d');
const graficobarvertical = new Chart(bar_vertical, {
  type: 'bar', // Define o tipo como barras
  data: {
    labels: ['S012', 'L010', 'N010', 'OE023', 'S112', 'S011', 'N013', 'L012', 'S002', 'S001'],
    datasets: [{
      title: 'Volume de Alertas',
      label: 'Atenção',
      data: [10, 13, 2, 3, 12, 0, 3, 4, 1, 0],
      backgroundColor: 'rgba(235, 169, 54, 0.99)', 
      borderColor: 'rgba(235, 169, 54, 0.99)',
      borderWidth: 1
    },
    {
      label: 'crítico',
      data: [20, 10, 15, 10, 0, 12, 4, 1, 1, 2],
      backgroundColor: 'rgba(255, 99, 99, 0.7)', // Cor da segunda barra
      borderColor: 'rgba(255, 99, 99, 0.7)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Principais Pontos de Atenção'
      },
      },

      scales: {
            x: {
                stacked: true // Habilita o empilhamento no eixo X
            },
            y: {
                stacked: true // Habilita o empilhamento no eixo Y
            }
        }

  }
});

