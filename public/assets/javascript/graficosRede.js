// ID dinamico
document.addEventListener("DOMContentLoaded", async() => {
  // Busca o ?id= na URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDisplay = urlParams.get('id');
  const spanIdentificador = document.getElementById("display_identificador");

  if (idDisplay && spanIdentificador) {
    spanIdentificador.innerHTML = `D00${idDisplay}`;
  }

  let indiceAtual = 0;

  const resposta = await fetch('/rede/buscarDadosRede', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idEmpresa: 1 })
  })
  const json  = await resposta.json()
  const dados = json[idDisplay]

  if (!dados) {
    console.error('Display não encontrado no JSON:', idDisplay)
    return
  }

  // ── Preenche KPIs ───────────────────────────────────────────────────────────
  function formatarVelocidade(valorMBs) {

  if (valorMBs === 0) {
    return {
      valor: '0',
      unidade: 'B/s'
    };
  }

  const valorKBs = valorMBs * 1024;

  if (valorKBs < 1024) {
    return {
      valor: valorKBs.toFixed(1),
      unidade: 'KB/s'
    };
  }

  return {
    valor: valorMBs.toFixed(2),
    unidade: 'MB/s'
  };
}


  function atualizarKPIs() {
    const leituraFluxo = dados.fluxoDados[indiceAtual];
    const leituraLatencia = dados.latenciaHistorico[indiceAtual];

    const download = formatarVelocidade(leituraFluxo.download_mbs);
    const upload = formatarVelocidade(leituraFluxo.upload_mbs);

    document.getElementById('kpi-download').innerHTML =
    `${download.valor}<small style="font-size:1rem;"> ${download.unidade}</small>`;

    document.getElementById('kpi-upload').innerHTML =
    `${upload.valor}<small style="font-size:1rem;"> ${upload.unidade}</small>`;

    document.getElementById('kpi-latencia').innerHTML =
    `${leituraLatencia.latencia.toFixed(1)}<small style="font-size:1rem;"> ms</small>`;

    document.getElementById('kpi-pacotes').textContent = dados.kpis.pacotes_descartados

    document.getElementById('kpi-erros').textContent   = dados.kpis.erros_io
 
  indiceAtual++;

  if (indiceAtual >= dados.fluxoDados.length) {
    indiceAtual = 0;
  }
}
  atualizarKPIs();
  setInterval(atualizarKPIs, 60000);

// ── Prepara dados: Fluxo de Dados ───────────────────────────────────────────
  const labelsFluxo = dados.fluxoDados.map(p => p.timestamp)
  const dlData      = dados.fluxoDados.map(p => p.download_mbs)
  const ulData      = dados.fluxoDados.map(p => p.upload_mbs)

  // ── Prepara dados: Latência ─────────────────────────────────────────────────
  const labelsLat = dados.latenciaHistorico.map(p => p.timestamp)
  const latData   = dados.latenciaHistorico.map(p => p.latencia)

  // ── Prepara dados: Conexões ─────────────────────────────────────────────────
  const labelsConexoes = ['ESTABLISHED', 'LISTEN', 'TIME_WAIT', 'CLOSE_WAIT', 'SYN_SENT']
  const conexoesData   = [
    dados.conexoes.established,
    dados.conexoes.listen,
    dados.conexoes.time_wait,
    dados.conexoes.close_wait,
    dados.conexoes.syn_sent
  ]
  const CONN_COLORS = ['#6D33FF', '#3DD68C', '#FFB547', '#FF4D6A', '#4A9EFF']

  // ── Prepara dados: Estabilidade ─────────────────────────────────────────────
  // Remove duplicata de hora (pode acontecer na primeira/última hora do CSV)
  const estabSemDup   = dados.estabilidade.filter((item, index, self) =>
    self.findIndex(i => i.hora === item.hora) === index
  )
  const labelsEstab   = estabSemDup.map(p => p.hora)
  const uptimeData    = estabSemDup.map(p => p.uptime)
  const lossData      = estabSemDup.map(p => p.perdaPacotes)

  // ── Gráfico: Fluxo de Dados ─────────────────────────────────────────────────
  new Chart(document.getElementById('graficoTp'), {
    type: 'line',
    data: {
      labels: labelsFluxo,
      datasets: [
        {
          label: 'wlan0 ↓',
          data: dlData,
          borderColor: '#6D33FF',
          backgroundColor: '#6D33FF14',
          fill: true,
          tension: 0.4,
          borderWidth: 1.8,
          pointRadius: 0
        },
        {
          label: 'wlan0 ↑',
          data: ulData,
          borderColor: '#4A9EFF',
          borderDash: [5, 4],
          fill: false,
          tension: 0.4,
          borderWidth: 1.8,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top' } },
      scales: {
        x: {
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: (val, index) => labelsFluxo[index].substring(0, 5) },
          grid:  { color: 'rgba(0,0,0,0.05)' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: v => v + ' MB/s' },
          grid:  { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  })

  // ── Gráfico: Latência ───────────────────────────────────────────────────────
  new Chart(document.getElementById('graficoLat'), {
    type: 'line',
    data: {
      labels: labelsLat,
      datasets: [{
        label: 'Latência (Ping)',
        data: latData,
        borderColor: '#6D33FF',
        backgroundColor: '#6D33FF14',
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
      plugins: { legend: { display: false } },
      scales: {
       x: {
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: (val, index) => labelsLat[index].substring(0, 5) },
          grid:  { color: 'rgba(0,0,0,0.05)' }  
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: v => v + ' ms' },
          grid:  { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  })


  // ── Gráfico: Conexões ───────────────────────────────────────────────────────
  new Chart(document.getElementById('graficoCon'), {
    type: 'bar',
    data: {
      labels: labelsConexoes,
      datasets: [{
        label: 'Conexões',
        data: conexoesData,
        backgroundColor: CONN_COLORS,
        borderRadius: 4,
        barThickness: 12
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          beginAtZero: true,
          grid:  { color: 'rgba(0,0,0,0.05)' },
          ticks: { color: '#9B9B9B', font: { size: 10 } }
        },
        y: {
          grid:  { display: false },
          ticks: { color: '#4A4A4A', font: { size: 11, weight: '700' } }
        }
      }
    }
  })


  // ── Gráfico: Estabilidade 24h ───────────────────────────────────────────────
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
          yAxisID: 'yUptime'
        },
        {
          label: 'Perda de Pacotes',
          data: lossData,
          borderColor: '#FF4D6A',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          borderWidth: 1.8,
          pointRadius: 2,
          pointBackgroundColor: '#FF4D6A',
          yAxisID: 'yMetrics'
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
          ticks: { color: '#9B9B9B', font: { size: 9 }, callback: v => v },
          grid:  { drawOnChartArea: false }
        }
      }
    }
  })

  // ── Diagnóstico ─────────────────────────────────────────────────────────────
  const diagList = document.getElementById('diag-list')
  if (diagList) {
    const d = dados.diagnostico
    diagList.innerHTML = `
      <div class="diag-row">
        <span class="diag-left"><span class="diag-dot ${d.download_ativo ? 'green' : 'red'}"></span>Download Ativo</span>
        <span class="diag-val ${d.download_ativo ? 'green-text' : 'red-text'}">${d.download_ativo ? 'Sim' : 'Não'}</span>
      </div>
      <div class="diag-row">
        <span class="diag-left"><span class="diag-dot ${d.latencia_ok ? 'green' : 'red'}"></span>Latência OK</span>
        <span class="diag-val ${d.latencia_ok ? 'green-text' : 'red-text'}">${d.latencia_ok ? 'Sim' : 'Não'}</span>
      </div>
      <div class="diag-row">
        <span class="diag-left"><span class="diag-dot ${d.pacotes_descartados === 0 ? 'green' : 'red'}"></span>Pacotes Descartados</span>
        <span class="diag-val ${d.pacotes_descartados === 0 ? 'green-text' : 'red-text'}">${d.pacotes_descartados}</span>
      </div>
      <div class="diag-row">
        <span class="diag-left"><span class="diag-dot ${d.erros_pacote === 0 ? 'green' : 'red'}"></span>Erros de Pacote</span>
        <span class="diag-val ${d.erros_pacote === 0 ? 'green-text' : 'red-text'}">${d.erros_pacote}</span>
      </div>
      <div class="diag-row">
        <span class="diag-left"><span class="diag-dot ${d.mtu_padrao ? 'green' : 'red'}"></span>MTU Padrão</span>
        <span class="diag-val ${d.mtu_padrao ? 'green-text' : 'red-text'}">${dados.mtu.valor} — ${dados.mtu.tipo}</span>
      </div>
    `
  }

});

