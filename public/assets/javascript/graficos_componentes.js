document.addEventListener("DOMContentLoaded", async() => {

  const urlParams = new URLSearchParams(window.location.search);
  const idDisplay = urlParams.get('id');
  const spanIdentificador = document.getElementById("display_identificador");

  if (idDisplay && spanIdentificador) {
    spanIdentificador.innerHTML = `D00${idDisplay}`;
  }

  // Faz a requisição para buscar os dados de monitoramento
  const resposta = await fetch(`/display_componentes/dashboard/${idDisplay}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idEmpresa: 1 })
  });
  
  const json = await resposta.json();
  const dados = json[idDisplay];

  if (!dados) {
    console.error('Display não encontrado no JSON:', idDisplay);
    return;
  }

  const tbodyProcessos = document.getElementById('lista-processos');

  if (tbodyProcessos) {
  // Limpa qualquer dado residual na tabela antes de renderizar
  tbodyProcessos.innerHTML = '';

  // Captura o array de processos mapeado no seu JSON do S3
  const processos = dados.historico_processos;

  processos.forEach(proc => {
    // Regra de estilo: se a CPU for maior que 80%, destaca em vermelho igual ao seu protótipo
    const corCpu = proc.consumo_cpu >= 80.0 ? 'style="color: red;"' : '';
    
    let statusProcesso = "Executando";
    if (proc.consumo_cpu === 0 && proc.consumo_ram === 0) {
      statusProcesso = "Ocioso";
    } else if (proc.consumo_cpu < 1.0) {
      statusProcesso = "Dormindo";
    }

    const linhaHtml = `
      <tr>
        <td>${proc.pid}</td>
        <td class="info-foco">${proc.nomeProcesso}</td>
        <td>${statusProcesso}</td>
        <td class="info-foco">${proc.consumo_ram.toFixed(3)}</td>
        <td class="info-foco" ${corCpu}>${proc.consumo_cpu.toFixed(1)}</td>
      </tr>
    `;

    // Injeta a linha na tabela
    tbodyProcessos.innerHTML += linhaHtml;
  });
}

  // Extrai as informações linha por linha do array 'historico_dados' vindo do S3
  const labels = dados.historico_dados.map(p => p.data_hora.substring(11, 16)); // Filtra para mostrar apenas HH:MM
  const dadosFrequencia = dados.historico_dados.map(p => p.cpu_freq);
  const dadosTemperatura = dados.historico_dados.map(p => p.temp_atual);
  const dadosRam = dados.historico_dados.map(p => p.ram_porcentagem);


  //Gráfico: Uso de CPU
  new Chart(document.getElementById('graficoCpu'), {
    type: 'line',
    data: {
      labels: labels, 
      datasets: [
        {
          label: 'Frequência Atual',
          data: dadosFrequencia, 
          borderColor: '#1f77b4',
          borderWidth: 2,
          yAxisID: 'y',
          pointRadius: 0
        },
        {
          label: 'Temperatura',
          data: dadosTemperatura, 
          borderColor: '#ff7f0e',
          borderWidth: 2,
          yAxisID: 'y1',
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Frequência (GHz)'
          },
          suggestedMin: 0,
          suggestedMax: 4.0
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Temperatura (°C)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          grid: { drawOnChartArea: false } 
        }
      },
      plugins: {
        annotation: {
          annotations: {
            limiteFreq: {
              type: 'line',
              yAxisID: 'y',
              yMin: 3.50,
              yMax: 3.50,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [6, 6], 
              label: {
                display: true,
                content: 'Limite Freq (3.5 GHz)',
                position: 'end'
              }
            }
          }
        }
      }
    }
  });


  //Gráfico: Uso de RAM
  new Chart(document.getElementById('graficoRam'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Consumo Atual',
        data: dadosRam, 
        borderColor: '#8a63ff',
        borderWidth: 2.4, 
        fill: false,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 45, 
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Uso de RAM (%)'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Uso de RAM', 
          align: 'start',
          font: { size: 16 }
        },
        annotation: {
          annotations: {
            faixaAlerta: {
              type: 'box',
              yMin: 80,
              yMax: 90,
              backgroundColor: 'rgba(255, 235, 59, 0.15)' 
            },
            faixaCritica: {
              type: 'box',
              yMin: 90,
              yMax: 100,
              backgroundColor: 'rgba(244, 67, 54, 0.15)' 
            },
            linhaAlerta: {
              type: 'line',
              yMin: 80,
              yMax: 80,
              borderColor: 'goldenrod',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'Alerta (80%)',
                position: 'end'
              }
            },
            linhaCritica: {
              type: 'line',
              yMin: 90,
              yMax: 90,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'Crítico (90%)',
                position: 'end'
              }
            }
          }
        }
      }
    }
  });

});

  function abrirRede() {
    const idDisplay = new URLSearchParams(window.location.search).get('id');

    window.location.href = `rede.html?id=${idDisplay}`;
}