let _dadosCompletos = null;

const AlertaController = {

    // Função assíncrona que recebe os dados do Service
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

    // Atualiza os dados das KPIs
    atualizarKPIs(kpis) {
        if (!kpis) return;

        // KPI 1 — "Visão dos Dispositivos" 
        const spanValues = document.querySelectorAll(".stat-value span");
        if (spanValues.length >= 3) {
            spanValues[0].textContent = kpis.displays_precisam_atencao ?? "--";
            spanValues[2].textContent = kpis.total_displays ?? "--";
        }

        // KPI 1 — Displays sem alertas
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

        // KPI 2 — Funcionamento Global — percentual em alerta
        const statValueDisp = document.querySelector(".stat-value-disp");
        if (statValueDisp) {
            statValueDisp.textContent = `${kpis.percentual_em_alerta ?? "--"}%`;
        }

        // KPI 2 — Funcionamento Global — variação vs ontem
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

    // KPI 3 — Tempo Médio de Resolução (Jira)
    atualizarJira(jira) {
        if (!jira) return;

        const statValue = document.querySelector(".kpi-card:nth-child(3) .stat-value");
        if (statValue) {
            statValue.textContent = `${Math.round(jira.mttr_medio)} min`;
        }

        const statValue2 = document.querySelector(".stat-value-2");
        if (statValue2) {
            statValue2.textContent = `MTTR médio calculado`;
        }

        const minMax = document.querySelectorAll(".min-max-info strong");
        if (minMax.length >= 2) {
            minMax[0].textContent = `${Math.round(jira.melhor_mttr)} min`;
            minMax[1].textContent = `${Math.round(jira.pior_mttr)} min`;
        }

        const footerSpan = document.querySelector(".kpi-card:nth-child(3) .card-footer span:last-child");
        if (footerSpan) {
            footerSpan.textContent = `${jira.abertos} incidente(s) em aberto`;
        }
    },

    // Renderiza botões de zona dinamicamente
    renderizarBotoesZona(zonas) {
        if (!zonas) return;

        const container = document.querySelector(".filtro-zonas");
        if (!container) return;

        container.innerHTML = "";

        // Botão "Todas as Zonas"
        const btnTodas = document.createElement("button");
        btnTodas.textContent = "Todas as Zonas";
        btnTodas.classList.add("btn-zona", "active");

        btnTodas.addEventListener("click", () => {
            document.querySelectorAll(".btn-zona").forEach(b => b.classList.remove("active"));
            btnTodas.classList.add("active");

            // Restaura KPIs e gráficos com dados completos (todas as zonas somadas)
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

                // Monta objeto com estrutura completa esperada pelo renderizarTodos
                // mas usando os dados específicos da zona
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

    // Exibe mensagem de erro na tela
    exibirErro(mensagem) {
        const container = document.querySelector(".graficos") || document.body;
        const div = document.createElement("div");
        div.textContent = `Não foi possível carregar os dados: ${mensagem}`;
        container.prepend(div);
    }
};

document.addEventListener("DOMContentLoaded", () => AlertaController.init());