
const AlertaApex = {

  // Criação das variáveis
  _charts: {
    kpi: null,
    line: null,
    bar: null,
    barV: null,
    scatter: null,
  },

  // Chamada o controller
  renderizarTodos(dados) {
    this.sparklineKPI(dados.grafico_evolucao_diaria);
    this.linhaEvolucao(dados.grafico_evolucao_diaria);
    this.barrasCausaRaiz(dados.grafico_causa_raiz);
    this.barrasRankingDisplays(dados.grafico_ranking_displays);
    this.dispersao24h(dados.grafico_dispersao_alertas);
  },

  // Evita que o apexchart empilhe gráficos
  // Apaga os dados anterior, antes de redenrizar os novos
  _destruir(chave) {
    if (this._charts[chave]) {
      this._charts[chave].destroy();
      this._charts[chave] = null;
    }
  },


  // KPI - Funcionamento Global (#line-kpi)
sparklineKPI(evolucao) {
    const linhaGlobal = document.querySelector("#line-kpi");
    if (!linhaGlobal) return;

    this._destruir("kpi");

    const valores = [];
    if (evolucao) {
        for (let i = 0; i < evolucao.length; i++) {
            valores.push(evolucao[i].total);
        }
    }

    this._charts.kpi = new ApexCharts(linhaGlobal, {
        series: [{ name: "Funcionamento:", data: valores }],
        chart: {
            type: "area", width: "100%", height: "100%",
            zoom: { enabled: false }, toolbar: { show: false },
            sparkline: { enabled: true }
        },
        dataLabels: { enabled: false },
        fill: { colors: ["#c6ff33"] }
    });

    this._charts.kpi.render();
},

  // Gráfico de Área — Histórico 7 dias (#graficoLine)
linhaEvolucao(evolucao) {
    const areaLinha = document.querySelector("#graficoLine");
    if (!areaLinha) return;

    const labels = [];
    const valores = [];

    if (evolucao) {
        for (let i = 0; i < evolucao.length; i++) {
            labels.push(evolucao[i].data);
            valores.push(evolucao[i].total);
        }
    }

    const limite = valores.length
        ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
        : 10;

    this._destruir("line");

    this._charts.line = new ApexCharts(areaLinha, {
        series: [{ name: "Quantidade de Alertas", data: valores }],
        chart: {
            type: "area", background: "transparent",
            width: "100%", height: "100%",
            zoom: { enabled: false }, toolbar: { show: false }
        },
        dataLabels: { enabled: true },
        stroke: { curve: "straight" },
        title: {
            text: "Histórico de Alertas (Últimos 7 dias)",
            align: "center",
            style: { fontSize: "14px", fontWeight: "bold" }
        },
        labels,
        xaxis: { type: "category" },
        annotations: {
            yaxis: [{
                y: limite,
                borderColor: "var(--color-danger)",
                strokeDashArray: 4,
                label: {
                    borderColor: "var(--color-danger)",
                    style: { color: "var(--color-white)", background: "var(--color-danger)" },
                    text: `Referência: ${limite}`
                }
            }]
        },
        grid: { show: false },
        fill: { colors: ["#c6ff33"] },
        legend: { horizontalAlign: "left" }
    });

    this._charts.line.render();
},

  // Barras verticais — Causa Raiz (#grafico-bar)
  barrasCausaRaiz(causaRaiz) {
    const graficoBar = document.querySelector("#grafico-bar");
    if (!graficoBar) return;

    const categorias = causaRaiz ? Object.keys(causaRaiz) : ["CPU", "DISCO", "RAM"];
    const valores = causaRaiz ? Object.values(causaRaiz) : [0, 0, 0];

    this._destruir("bar");

    this._charts.bar = new ApexCharts(graficoBar, {
      series: [
        {
           name: "Alertas", 
           data: valores 
          }
        ],
      chart: {
        height: "100%",
        type: "bar",
        toolbar: { 
          show: false 
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 10,
          dataLabels: { 
            position: "top" 
          }
        }
      },
      dataLabels: { 
        enabled: false 
      },
      xaxis: {
        categories: categorias,
        position: "bottom",
        axisBorder: { 
          show: false 
        },
        axisTicks: { 
          show: false 
        }
      },
      yaxis: {
        axisBorder: { 
          show: false 
        },
        axisTicks: { 
          show: false 
        }
      },
      title: {
        text: "Alertas por Tipo de Componente",
        align: "center",
        style: { 
          fontSize: "14px", 
          fontWeight: "bold" 
        }
      },
      grid: { 
        show: false 
      },
      colors: [
        "#564592", 
        "#CA7DF9", 
        "#EDF67D"
      ]
    });

    this._charts.bar.render();
  },

  //  Barras horizontais empilhadas — Top 10 Displays (#grafico-bar-vertical)
  barrasRankingDisplays(ranking) {
    const bartop10 = document.querySelector("#grafico-bar-vertical");
    if (!bartop10) return;

    const top10 = ranking ? ranking.slice(0, 10) : [];
    const categorias = top10.map(d => `Display ${d.idDisplay}`);
    const serieAtencao = top10.map(d => d["Atenção"] ?? 0);
    const serieCritico = top10.map(d => d["Crítico"] ?? 0);

    this._destruir("barV");

    this._charts.barV = new ApexCharts(bartop10, {
      series: [
        { 
          name: "Atenção", 
          data: serieAtencao 
        },
        { 
          name: "Crítico", 
          data: serieCritico 
        }
      ],
      colors: [
        "#FFC107", 
        "#DC3545"
      ],
      chart: {
        type: "bar",
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
                fontSize: "13px", 
                fontWeight: 900 
              }
            }
          }
        }
      },
      stroke: { 
        width: 1, 
        colors: ["#fff"] 
      },
      title: {
        text: "Top 10 Displays com Mais Alertas",
        align: "center",
        style: { 
          fontSize: "14px", 
          fontWeight: "bold" }
      },
      xaxis: {
        categories: categorias,
        labels: { 
          formatter: val => val 
        }
      },
      yaxis: { 
        title: { 
          text: undefined 
        } 
      },
      tooltip: { 
        y: { 
          formatter: val => val 
        } 
      },
      fill: { 
        opacity: 1 
      },
      legend: { 
        position: "top", 
        horizontalAlign: "center", 
        offsetX: 40 
      }
    });

    this._charts.barV.render();
  },

  //  Scatter plot — Dispersão 24h (#grafico-scarte-plot)
  dispersao24h(dispersao) {
    const scartePlot = document.querySelector("#grafico-scarte-plot");
    if (!scartePlot) return;

    const horaParaNum = h => {
      const [hora, minuto] = h.replace("h", ":").split(":");
      return parseInt(hora, 10) + (parseInt(minuto || 0, 10) / 60);
    };
    const atencao = [];
    const critico = [];

    (dispersao || []).forEach(ponto => {
      const par = [horaParaNum(ponto.hora), ponto.uso_percentual];
      ponto.tipo_alerta === "Crítico" ? critico.push(par) : atencao.push(par);
    });

    this._destruir("scatter");

    this._charts.scatter = new ApexCharts(scartePlot, {
      chart: {
        type: "scatter",
        height: 240,
        zoom: { enabled: true, type: "xy" },
        toolbar: { show: false }
      },
      title: {
        text: "Histórico de Alertas nas Últimas 24h",
        align: "center",
        style: { fontSize: "14px", fontWeight: "bold" }
      },
      colors: ["#FFC107", "#DC3545"],
      series: [
        { name: "Atenção (59% – 80%)", data: atencao },
        { name: "Crítico (80% – 100%)", data: critico }
      ],
      xaxis: {
        type: "numeric",
        min: 0,
        max: 24,
        tickAmount: 12,
        labels: { formatter: val => Math.floor(val) + "h" }
      },
      yaxis: {
        min: 59,
        max: 100,
        tickAmount: 8,
        title: { text: "Uso do Componente (%)" },
        labels: { formatter: val => parseFloat(val).toFixed(0) + "%" }
      },
      annotations: {
        yaxis: [{
          y: 80,
          borderColor: "#DC3545",
          label: {
            borderColor: "#DC3545",
            style: { color: "#fff", background: "#DC3545" },
            text: "Início da Zona Crítica (80%)"
          }
        }]
      },
      tooltip: {
        x: { formatter: val => "Horário: " + val.toFixed(1) + "h" },
        y: { formatter: val => val.toFixed(1) + "% de uso" }
      },
      legend: { position: "top" }
    });

    this._charts.scatter.render();
  }

};
