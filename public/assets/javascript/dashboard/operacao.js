/**
 * Dashboard Operacional DOOH
 *
 * Author: Marley de S. Santos
 */

// Instâncias dos gráficos — guardadas para destruir antes de redesenhar
let chartPontuacaoInst = null;
let chartUptimeInst = null;
let chartMttrInst = null;
let chartTendenciaInst = null;

let mapaZonas = {};

const fetchZonas = async () => {
  try {
    const response = await fetch("/operacao/zonas");
    if (response.ok) {
      const zonas = await response.json();
      zonas.forEach((z) => {
        mapaZonas[z.idZona] = z.nome;
      });
    }
  } catch (error) {
    console.error("Erro ao carregar nomes das zonas:", error);
  }
};

const getNomeZona = (idOuTexto) => {
  if (!idOuTexto) return "N/A";
  if (mapaZonas[idOuTexto]) return mapaZonas[idOuTexto];
  if (typeof idOuTexto === "string" && idOuTexto.startsWith("Zona ")) {
    const id = idOuTexto.replace("Zona ", "");
    if (mapaZonas[id]) return mapaZonas[id];
  }
  return idOuTexto;
};

const fetchData = async () => {
  try {
    // Busca zonas sem bloquear o carregamento principal
    fetchZonas();

    // FUTURO: const response = await fetch("/rota-do-node");
    const response = await fetch("./dashboard.json");
    if (!response.ok) throw new Error("Erro ao buscar JSON");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

const buscarMetaContratual = () => {
  fetch("/contratos/meta-operacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idEmpresa: sessionStorage.FKEMPRESA }),
  })
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((dados) => {
      if (dados && dados.length > 0) {
        document.getElementById("meta-contratual-disponibilidade").innerHTML =
          `${dados[0].metaDisponibilidade}%`;
        document.getElementById("value-meta").innerHTML = dados[0].sla + " min";
      } else {
        document.getElementById("meta-contratual-disponibilidade").innerHTML =
          "N/A";
      }
    })
    .catch((e) => console.error("Erro meta contratual:", e));
};

buscarMetaContratual();

const capitalizar = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// Cor baseada na nota de saúde operacional
const corSaude = (nota) => {
  if (nota >= 85) return "var(--color-success)";
  if (nota >= 70) return "var(--color-amber)";
  return "var(--color-danger)";
};

// Cor baseada em uptime vs meta
const corUptime = (atual, meta) =>
  atual >= meta ? "var(--color-success)" : "var(--color-danger)";

// Destrói instância de gráfico antes de criar outra
const destruir = (inst) => {
  if (inst) inst.destroy();
};

// Fallback de melhor/pior zona quando o Jira não tem zona nos tickets
// Usa downtime / reincidencias de cada zona como proxy de MTTR
const mttrPorZonaCsv = (periodo) => {
  const zonas = periodo.zonas;
  if (!zonas || zonas.length === 0) return null;

  const ordenadas = [...zonas].sort(
    (a, b) => b.downtime.minutos - a.downtime.minutos,
  );

  return {
    pior: {
      zona: ordenadas[0].zona,
      mttr_min: Math.round(
        ordenadas[0].downtime.minutos / Math.max(ordenadas[0].reincidencias, 1),
      ),
    },
    melhor: {
      zona: ordenadas[ordenadas.length - 1].zona,
      mttr_min: Math.round(
        ordenadas[ordenadas.length - 1].downtime.minutos /
          Math.max(ordenadas[ordenadas.length - 1].reincidencias, 1),
      ),
    },
  };
};

const renderPontuacao = (periodo) => {
  destruir(chartPontuacaoInst);

  const nota = periodo.saude_operacional.nota;
  const status = periodo.saude_operacional.status;
  const varPts = periodo.saude_operacional.variacao_pts;
  const labelVar = periodo.saude_operacional.label_variacao;
  const color = corSaude(nota);

  chartPontuacaoInst = new ApexCharts(document.querySelector("#pontuacao"), {
    chart: { type: "radialBar", height: "100%", fontFamily: "Open Sans" },
    series: [(nota / 100) * 100],
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: { size: "65%" },
        track: { background: "#d3d3d3", strokeWidth: "100%" },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: "bold",
            color: "var(--color-deep-purple)",
            offsetY: 8,
            formatter: () => `${nota}/100`,
          },
        },
      },
    },
    stroke: { lineCap: "butt" },
  });
  chartPontuacaoInst.render();

  const statusEl = document.getElementById("status-saude-operacao");
  if (statusEl) {
    statusEl.innerHTML = capitalizar(status);
    statusEl.style.color = color;
  }

  const variacaoEl = document.getElementById("variacao-saude");
  if (variacaoEl) {
    variacaoEl.innerHTML = labelVar;
    variacaoEl.style.color =
      varPts >= 0 ? "var(--color-success)" : "var(--color-danger)";
  }
};

const renderUptime = (periodo, nomePeriodo) => {
  destruir(chartUptimeInst);

  const grafico = periodo.grafico_disponibilidade;
  const serieReal = grafico.real;
  const serieProj = grafico.projecao;
  const categorias = grafico.labels;
  const meta = periodo.uptime.meta_pct;

  // Gera as datas futuras para os pontos de projeção
  const labelsProjecao = [];
  const ultimaData = new Date(categorias[categorias.length - 1]);
  for (let i = 1; i <= serieProj.length; i++) {
    const d = new Date(ultimaData);
    d.setDate(ultimaData.getDate() + i);
    labelsProjecao.push(d.toISOString());
  }

  chartUptimeInst = new ApexCharts(document.querySelector("#disponibilidade"), {
    series: [
      { name: "Disponibilidade", data: serieReal },
      {
        name: "Projeção",
        data: [
          ...new Array(serieReal.length - 1).fill(null),
          serieReal[serieReal.length - 1],
          ...serieProj,
        ],
      },
    ],
    chart: {
      height: 350,
      width: "100%",
      type: "line",
      toolbar: { show: true },
    },
    annotations: {
      yaxis: [
        {
          y: meta,
          borderColor: "var(--color-danger)",
          strokeDashArray: 4,
          label: {
            borderColor: "var(--color-danger)",
            style: {
              color: "var(--color-white)",
              background: "var(--color-danger)",
            },
            text: `Meta: ${meta}%`,
          },
        },
      ],
    },
    stroke: { width: [5, 4], curve: "smooth", dashArray: [0, 8] },
    colors: ["#6D33FF", "#ff9b00"],
    xaxis: {
      type: "datetime",
      categories: [...categorias, ...labelsProjecao],
      labels: {
        formatter: (ts) => {
          const d = new Date(ts);
          return d.toLocaleString("pt-BR", { day: "2-digit", month: "short" });
        },
      },
    },
    title: {
      text: `Evolução da disponibilidade (${nomePeriodo})`,
      align: "left",
      style: { fontSize: "18px", color: "#1e0b36" },
    },
  });
  chartUptimeInst.render();

  // Card uptime
  const atual = periodo.uptime.atual_pct;
  const color = corUptime(atual, meta);

  const uptimeValEl = document.querySelector("#kpi2 .valor span:last-child");
  if (uptimeValEl) {
    uptimeValEl.innerHTML = `${atual}%`;
    uptimeValEl.style.color = color;
  }

  const uptimeInfoEl = document.querySelector("#kpi2 .info span:first-child");
  if (uptimeInfoEl) {
    uptimeInfoEl.innerHTML = periodo.uptime.label_delta;
    uptimeInfoEl.style.color = color;
  }
};

const renderMttr = (periodo, jira) => {
  destruir(chartMttrInst);

  const mttrAtual = periodo.mttr.medio_min;
  const meta = periodo.mttr.meta_min;
  const mttrAnterior = jira.mttr.pior_min || 0; // pior como referência de "anterior"

  chartMttrInst = new ApexCharts(document.querySelector("#mttr"), {
    series: [{ name: "MTTR", data: [mttrAnterior, mttrAtual] }],
    chart: {
      height: "100%",
      type: "line",
      zoom: { enabled: false },
      toolbar: false,
    },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth", width: 5 },
    annotations: {
      yaxis: [
        {
          y: meta,
          borderColor: "#ff3d00",
          strokeDashArray: 4,
          label: {
            borderColor: "#ff3d00",
            style: { color: "#fff", background: "#ff3d00" },
            text: `Meta ${meta} min`,
          },
        },
      ],
    },
    xaxis: { categories: ["Anterior", "Atual"] },
    colors: ["#6D33FF"],
  });
  chartMttrInst.render();

  // Valor grande
  const bigKpi = document.querySelector(".big-kpi");
  if (bigKpi) bigKpi.innerHTML = `${Math.round(mttrAtual)} min`;

  // Variação vs meta
  const descKpi = document.querySelector(".desc-kpi");
  if (descKpi) {
    const abaixoMeta = mttrAtual <= meta;
    const pct = Math.abs(Math.round(((mttrAtual - meta) / meta) * 100));
    descKpi.innerHTML = `
      <div style="color:${abaixoMeta ? "var(--color-success)" : "var(--color-danger)"}">
        ${abaixoMeta ? "▼" : "▲"} ${pct}%
      </div>
      <div>${abaixoMeta ? "Abaixo da meta" : "Acima da meta"}</div>
    `;
  }

  // Melhor e pior zona
  let piorZona = periodo.mttr.pior_zona;
  let melhorZona = periodo.mttr.melhor_zona;

  const miniCards = document.querySelectorAll(".mini-card");
  if (miniCards.length >= 2 && piorZona && melhorZona) {
    // Pior caso
    miniCards[0].querySelector("span:nth-child(1)").innerHTML =
      `${Math.round(piorZona.mttr_min)} min`;
    miniCards[0].querySelector("span:nth-child(2)").innerHTML = "Pior caso";
    miniCards[0].querySelector("span:nth-child(3)").innerHTML = getNomeZona(
      piorZona.zona,
    );

    // Melhor caso
    miniCards[1].querySelector("span:nth-child(1)").innerHTML =
      `${Math.round(melhorZona.mttr_min)} min`;
    miniCards[1].querySelector("span:nth-child(2)").innerHTML = "Melhor caso";
    miniCards[1].querySelector("span:nth-child(3)").innerHTML = getNomeZona(
      melhorZona.zona,
    );
  }
};

const renderTendencia = (periodo) => {
  destruir(chartTendenciaInst);

  const tendencia = periodo.grafico_disponibilidade.real.slice(-4);
  const nota = periodo.saude_operacional.nota;
  const color = corSaude(nota);

  chartTendenciaInst = new ApexCharts(
    document.querySelector("#tendencia-pontuacao-chart"),
    {
      chart: {
        type: "line",
        height: 50,
        sparkline: { enabled: true },
        animations: { enabled: true },
      },
      series: [{ data: tendencia }],
      colors: [color],
      stroke: { curve: "smooth", width: 2 },
      markers: { size: 0 },
      tooltip: { enabled: false },
    },
  );
  chartTendenciaInst.render();
};

const renderDowntimeRisco = (periodo) => {
  // Downtime
  const downtimeEl = document.querySelector("#kpi3 .valor span:last-child");
  if (downtimeEl) downtimeEl.innerHTML = periodo.downtime.formatado;

  const downInfoEls = document.querySelectorAll("#kpi3 .info span");
  if (downInfoEls.length >= 2) {
    downInfoEls[0].innerHTML = periodo.downtime.label_variacao;
    downInfoEls[0].style.color =
      periodo.downtime.variacao_min > 0
        ? "var(--color-danger)"
        : "var(--color-success)";

    downInfoEls[1].innerHTML = `Projeção até o fim do período: <span class="val">+${periodo.downtime.projecao_fmt}</span>`;
  }

  // Risco operacional
  const nivel = periodo.risco_operacional.nivel;
  const corRisco = {
    alto: "var(--color-danger)",
    médio: "var(--color-amber)",
    baixo: "var(--color-success)",
  };

  const riscoEl = document.querySelector("#kpi4 .valor span:last-child");

  if (riscoEl) {
    riscoEl.innerHTML = capitalizar(nivel);
    riscoEl.style.color = corRisco[nivel] || "var(--color-danger)";
  }

  const riscoInfoEls = document.querySelectorAll("#kpi4 .info span");
  if (riscoInfoEls.length >= 2) {
    const dias = periodo.risco_operacional.dias_para_violacao;
    riscoInfoEls[0].innerHTML =
      dias !== null ? "Risco de violação de SLA" : "Dentro do SLA no período";
    riscoInfoEls[1].innerHTML = periodo.risco_operacional.label;
  }
};

const renderIncidentes = (periodo) => {
  const incidenteCards = document.querySelectorAll(".incidentes .card");
  if (incidenteCards.length < 2) return;

  const slaPct =
    periodo.incidentes.percentual_dentro_sla ??
    periodo.incidentes.dentro_sla_pct ??
    0;

  const slaEl = incidenteCards[0].querySelector("span:last-child");
  slaEl.innerHTML = `${slaPct}%`;
  slaEl.style.color =
    slaPct >= 100
      ? "var(--color-success)"
      : slaPct >= 80
        ? "var(--color-amber)"
        : "var(--color-danger)";

  incidenteCards[1].querySelector("span:last-child").innerHTML =
    periodo.incidentes.fechados;
};

const renderTabela = (periodo) => {
  const tbody = document.querySelector(".tabela table tbody");
  if (!tbody) return;

  tbody.querySelectorAll("tr:not(:first-child)").forEach((tr) => tr.remove());

  periodo.zonas.forEach((zona) => {
    const tr = document.createElement("tr");

    const tendenciaTexto = zona.disponibilidade.tendencia;
    const tendenciaMap = { melhora: "▲", piora: "▼", estável: "→" };
    const tendenciaSimbolo = tendenciaMap[tendenciaTexto] || "→";
    const corTendencia =
      tendenciaTexto === "melhora"
        ? "color:var(--color-success)"
        : tendenciaTexto === "piora"
          ? "color:var(--color-danger)"
          : "";

    const corRisco =
      zona.indice_risco === "alto"
        ? "color:var(--color-danger)"
        : zona.indice_risco === "médio"
          ? "color:var(--color-amber)"
          : "color:var(--color-success)";

    const totalDisplays = zona.displays.total;
    const afetadosDisplays = zona.displays.afetados;
    const pctDisplays =
      totalDisplays > 0
        ? Math.round((afetadosDisplays / totalDisplays) * 100)
        : 0;

    tr.innerHTML = `
      <td>${getNomeZona(zona.zona)}</td>
      <td style="${corRisco}">${capitalizar(zona.indice_risco)}</td>
      <td>${zona.reincidencias}x</td>
      <td>${zona.downtime.formatado}</td>
      <td style="${corTendencia}">${tendenciaSimbolo}</td>
      <td>${afetadosDisplays} (${pctDisplays}%)</td>
    `;

    tbody.appendChild(tr);
  });
};

const configurarFiltros = (dados) => {
  const botoes = document.querySelectorAll(".filtro-periodo");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nomePeriodo = btn.dataset.periodo;
      const periodo = dados.periodos[nomePeriodo];

      if (!periodo) {
        console.error(`Período "${nomePeriodo}" não encontrado nos dados.`);
        return;
      }

      botoes.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      renderTudo(periodo, nomePeriodo, dados);
    });
  });
};

const renderTudo = (periodo, nomePeriodo, dados) => {
  const dataAtuEl = document.getElementById("data_atualizacao");
  if (dataAtuEl && dados.ultima_atualizacao) {
    let dadosAtualizacao = dados.ultima_atualizacao.split(" ");

    let dataAtt = dadosAtualizacao[0];

    let dataObjeto = new Date(dataAtt);

    let dia = dataObjeto.toLocaleString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    let horaAtt = dadosAtualizacao[1];

    let formatado = `${dia} às ${horaAtt}`;

    dataAtuEl.innerHTML = formatado;
  }

  renderPontuacao(periodo);
  renderUptime(periodo, nomePeriodo);
  renderMttr(periodo, dados.jira);
  renderTendencia(periodo);
  renderDowntimeRisco(periodo);
  renderIncidentes(periodo);
  renderTabela(periodo);
};

document.addEventListener("DOMContentLoaded", async () => {
  const dados = await fetchData();
  if (!dados) return;

  renderTudo(dados.periodos["duas_semanas"], "duas_semanas", dados);
  configurarFiltros(dados);
});
