let _dadosCompletos = null;
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

const fetchDadosOperacao = async () => {
    const response = await fetch("/operacao/dados/operacao", { cache: "no-cache" });

    if (!response.ok) {
        throw new Error(`Erro ao buscar dados de operação: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

const getNomeZona = (idOuTexto) => {
    if (!idOuTexto) return "N/A";
    if (mapaZonas[idOuTexto]) return mapaZonas[idOuTexto];
    if (typeof idOuTexto === "string" && idOuTexto.startsWith("Zona ")) {
        const id = idOuTexto.replace("Zona ", "");
        if (mapaZonas[id]) return mapaZonas[id];
    }

    console.log(idOuTexto)
    return idOuTexto;
};

const AlertaController = {

    async init() {
    try {
        const [dados, dadosOperacao] = await Promise.all([
            AlertaService.buscarDados(),
            fetchDadosOperacao()
        ]);

        console.log("Dados Recebidos S3:", dados);
        console.log("Dados Operação:", dadosOperacao);

        _dadosCompletos = dados;

        this.atualizarKPIs(dados.kpis);
        this.atualizarJira(dadosOperacao);
        this.renderizarBotoesZona(dados.zonas);
        AlertaApex.renderizarTodos(dados);

    } catch (erro) {
        console.error("Falha ao inicializar dashboard:", erro);
        this.exibirErro(erro.message);
    }
},

    atualizarKPIs(kpis) {
        if (!kpis) return;

        const spanValues = document.querySelectorAll(".stat-value span");
        if (spanValues.length >= 3) {
            spanValues[0].textContent = kpis.displays_precisam_atencao ?? "--";
            spanValues[2].textContent = kpis.total_displays ?? "--";
        }

        const semAlertas = document.querySelector(".side-info");
        if (semAlertas) semAlertas.textContent = `${kpis.displays_sem_alertas ?? "--"} sem alertas`;

        const footerAtencao = document.querySelector(".card-footer span:nth-child(2)");
        if (footerAtencao) footerAtencao.textContent = `${kpis.displays_precisam_atencao ?? "--"} precisam de atenção`;

        const footerTotal = document.querySelector(".card-footer span:last-child");
        if (footerTotal) footerTotal.textContent = `${kpis.total_displays ?? "--"} total`;

        const statValueDisp = document.querySelector(".stat-value-disp");
        if (statValueDisp) statValueDisp.textContent = `${kpis.percentual_em_alerta ?? "--"}%`;

        const footerDisp = document.querySelector(".card-footer-disp span");
        if (footerDisp) {
            if (kpis.variacao_ontem !== null && kpis.variacao_ontem !== undefined) {
                const seta = kpis.variacao_ontem >= 0 ? "▲" : "▼";
                footerDisp.textContent = `${seta} ${Math.abs(kpis.variacao_ontem)} % vs Ontem`;
            } else {
                footerDisp.textContent = "— sem variação disponível";
            }
        }
    },

    atualizarJira(dadosOperacao) {
    const periodo = dadosOperacao?.periodos?.duas_semanas;
    const mttr = periodo?.mttr;
    const jira = dadosOperacao?.jira;

    if (!mttr) return;

    const mttrMedio = mttr.medio_min ?? 0;
    const melhorMttr = mttr.melhor_zona?.mttr_min ?? jira?.mttr?.melhor_min ?? 0;
    const piorMttr = mttr.pior_zona?.mttr_min ?? jira?.mttr?.pior_min ?? 0;
    const abertos = jira?.abertos ?? periodo?.incidentes?.abertos ?? 0;

    const statValue = document.querySelector(".kpi-card:nth-child(3) .stat-value");
    if (statValue) statValue.textContent = `${Math.round(mttrMedio)} min`;

    const statValue2 = document.querySelector(".stat-value-2");
    if (statValue2) statValue2.textContent = `MTTR médio calculado`;

    const minMax = document.querySelectorAll(".min-max-info strong");
    if (minMax.length >= 2) {
        minMax[0].textContent = `${Math.round(melhorMttr)} min`;
        minMax[1].textContent = `${Math.round(piorMttr)} min`;
    }

    const footerSpan = document.querySelector(".kpi-card:nth-child(3) .card-footer span:last-child");
    if (footerSpan) footerSpan.textContent = `${abertos} alertas(s) em aberto`;
},

    renderizarBotoesZona(zonas) {
        if (!zonas) return;

        const container = document.querySelector(".filtro-zonas");
        if (!container) return;

        container.innerHTML = "";

        const btnTodas = document.createElement("button");
        btnTodas.textContent = "Todas as Zonas";
        btnTodas.classList.add("btn-zona", "active");

        btnTodas.addEventListener("click", () => {
            document.querySelectorAll(".btn-zona").forEach(b => b.classList.remove("active"));
            btnTodas.classList.add("active");
            AlertaController.atualizarKPIs(_dadosCompletos.kpis);
            AlertaApex.renderizarTodos(_dadosCompletos);
        });

        container.appendChild(btnTodas);

        for (const idZona in zonas) {
            const btn = document.createElement("button");
            btn.textContent =  `Zona ${getNomeZona(idZona)}`|| `Zona ${idZona}`;
            btn.classList.add("btn-zona");

            btn.addEventListener("click", () => {
                document.querySelectorAll(".btn-zona").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const dadosZona = zonas[idZona];
                const dadosParaRenderizar = {
                    kpis: dadosZona.kpis,
                    grafico_dispersao_alertas: dadosZona.grafico_dispersao_alertas,
                    grafico_ranking_displays: dadosZona.grafico_ranking_displays,
                    grafico_evolucao_diaria: dadosZona.grafico_evolucao_diaria,
                    grafico_causa_raiz: dadosZona.grafico_causa_raiz,
                    telemetria_detalhada: dadosZona.telemetria_detalhada
                };

                AlertaController.atualizarKPIs(dadosZona.kpis);
                AlertaApex.renderizarTodos(dadosParaRenderizar);
            });

            container.appendChild(btn);
        }
    },

    exibirErro(mensagem) {
        const container = document.querySelector(".graficos") || document.body;
        const div = document.createElement("div");
        div.textContent = `Não foi possível carregar os dados: ${mensagem}`;
        container.prepend(div);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await fetchZonas();
    AlertaController.init();
});