
let _dadosCompletos = null;

const AlertaController = {

    // Função assincrona que recebe os dados do Service
    async init() {
        try {
            const dados = await AlertaService.buscarDados();

            console.log("Dados Recebidos S3:", dados);

            _dadosCompletos = dados;

            this.atualizarKPIs(dados.kpis);
            this.atualizarJira(dados.jira);
            this.renderizarBotoesZona(dados.zonas);
            AlertaApex.renderizarTodos(dados);

        } catch (erro) {
            console.error("Falha ao inicializar dashboard:", erro);
            this.exibirErro(erro.message);
        }
    },

    // Atualiza os dados das KPI
    atualizarKPIs(kpis) {
        if (!kpis) return;

        // KPI 1 - "Visão dos Dispositivos" — "X / Y"
        const spanValues = document.querySelectorAll(".stat-value span");
        if (spanValues.length >= 3) {
            spanValues[0].textContent = kpis.displays_precisam_atencao ?? "--";
            spanValues[2].textContent = kpis.total_displays ?? "--";
        }

        // KPI 1 - Displays sem alertas
        const semAlertas = document.querySelector(".side-info");
        if (semAlertas) {
            semAlertas.textContent = `${kpis.displays_sem_alertas ?? "--"} sem alertas`;
        }

        // Footer: Displays que precisam de atenção
        const footerAtencao = document.querySelector(".card-footer span:nth-child(2)");
        if (footerAtencao) {
            footerAtencao.textContent = `${kpis.displays_precisam_atencao ?? "--"} precisam de atenção`;
        }

        // Footer: Total de displays
        const footerTotal = document.querySelector(".card-footer span:last-child");
        if (footerTotal) {
            footerTotal.textContent = `${kpis.total_displays ?? "--"} total`;
        }

        // KPI 2 - Funcionamento Global — percentual em alerta
        const statValueDisp = document.querySelector(".stat-value-disp");
        if (statValueDisp) {
            statValueDisp.textContent = `${kpis.percentual_em_alerta ?? "--"}%`;
        }

        // KPI2 - Funcionamento Global — variação vs ontem
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

    // KPI 3 - Tempo Médio de Resolução (Jira)
    atualizarJira(jira) {
        if (!jira) return;

        // Valor principal — MTTR médio
        const statValue = document.querySelector(".kpi-card:nth-child(3) .stat-value");
        if (statValue) {
            statValue.textContent = `${Math.round(jira.mttr_medio)} min`;
        }

        // Variação vs ontem (por enquanto só exibe o valor)
        const statValue2 = document.querySelector(".stat-value-2");
        if (statValue2) {
            statValue2.textContent = `MTTR médio calculado`;
        }

        // Min e Max
        const minMax = document.querySelectorAll(".min-max-info strong");
        if (minMax.length >= 2) {
            minMax[0].textContent = `${Math.round(jira.melhor_mttr)} min`;
            minMax[1].textContent = `${Math.round(jira.pior_mttr)} min`;
        }

        // Footer — alertas críticos abertos
        const footerSpan = document.querySelector(".kpi-card:nth-child(3) .card-footer span:last-child");
        if (footerSpan) {
            footerSpan.textContent = `${jira.abertos} incidente(s) em aberto`;
        }
    },

    // Renderizar botão da zona dinamicamente
    renderizarBotoesZona(zonas) {
    if (!zonas) return;

    const container = document.querySelector(".filtro-zonas");
    if (!container) return;

    container.innerHTML = "";

    // Botão "Todas"
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

    // Botão por zona
    for (const idZona in zonas) {
        const btn = document.createElement("button");
        btn.textContent = `Zona ${idZona}`;
        btn.classList.add("btn-zona");
        btn.addEventListener("click", () => {
            document.querySelectorAll(".btn-zona").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const dadosZona = zonas[idZona];
            AlertaController.atualizarKPIs(dadosZona.kpis);
            AlertaApex.renderizarTodos(dadosZona);
        });
        container.appendChild(btn);
    }
},

    // Caso os dados não aparecem na tela, mensagem de aviso
    exibirErro(mensagem) {
        const container = document.querySelector(".graficos") || document.body;
        const div = document.createElement("div");

        div.textContent = `Não foi possível carregar os dados: ${mensagem}`;
        container.prepend(div);
    }

}

document.addEventListener("DOMContentLoaded", () => AlertaController.init());
