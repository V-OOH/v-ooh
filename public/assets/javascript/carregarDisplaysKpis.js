/**
 * carregarDisplaysKpis.js
 *
 * Responsável por:
 *  1. Buscar o JSON de alertas no bucket S3 via rota do backend
 *  2. Atualizar as KPIs de "Displays Críticos" e "Displays em risco"
 *  3. Enriquecer cada linha da tabela com o status dinâmico do display
 *
 * Dependências:
 *  - Executado DEPOIS que carregarDisplays.js terminar de montar as linhas da tabela
 *  - As <span class="number"> das KPIs precisam dos ids: kpi-criticos e kpi-em-risco
 *  - Cada <tr> da tabela de displays tem id no formato: d-{idDisplay}
 */

const DisplaysKpiService = {

    /**
     * Busca o JSON de alertas.
     * Ajuste a URL/rota conforme o seu backend — aqui está seguindo o mesmo
     * A rota é GET /api/alertas/dados-dashboard (alertasRouter no server.js).
     */
    async buscarDados() {
        const resposta = await fetch("/api/alertas/dados-dashboard", { method: "GET" });

        if (!resposta.ok) {
            const erro = await resposta.text();
            throw new Error(`Falha ao buscar dados de alertas: ${erro}`);
        }

        return resposta.json();
    },
};


const DisplaysKpiController = {

    /**
     * Mapa de status → configuração visual da célula de estado.
     * Adicione ou ajuste os status conforme os valores reais do seu backend.
     */
    _statusConfig: {
        "Crítico":      { classe: "status-critico",      label: "Crítico" },
        "Atenção":      { classe: "status-atencao",      label: "Atenção" },
        "Estável":      { classe: "status-estavel",      label: "Estável" },
        "Desconhecido": { classe: "status-desconhecido", label: "Desconhecido" },
    },

    /**
     * Ponto de entrada principal.
     * Chame esta função após carregarDisplays.js ter populado a tabela.
     */
    async init() {
        try {
            const dados = await DisplaysKpiService.buscarDados();
            console.log("[DisplaysKpiController] Dados recebidos:", dados);

            this._atualizarKPIs(dados);
            this._atualizarStatusTabela(dados);

        } catch (erro) {
            console.error("[DisplaysKpiController] Erro ao carregar KPIs:", erro);
        }
    },

    /**
     * Atualiza os dois cards de KPI:
     *  - "Displays Críticos"  → id="kpi-criticos"
     *  - "Displays em risco"  → id="kpi-em-risco"
     *
     * A lógica usa o grafico_ranking_displays para separar:
     *   - Crítico: displays que têm pelo menos 1 alerta do tipo Crítico
     *   - Em risco (Atenção): displays que têm alertas só de Atenção
     */
    _atualizarKPIs(dados) {
        const ranking = dados.grafico_ranking_displays ?? [];

        let totalCriticos = 0;
        let totalEmRisco   = 0;

        for (const display of ranking) {
            const critico  = display["Crítico"]  ?? 0;
            const atencao  = display["Atenção"]  ?? 0;

            if (critico > 0) {
                totalCriticos++;
            } else if (atencao > 0) {
                totalEmRisco++;
            }
        }

        // Atualiza o DOM — busca pelo id adicionado no HTML
        const spanCriticos = document.getElementById("kpi-criticos");
        const spanEmRisco   = document.getElementById("kpi-em-risco");

        if (spanCriticos) spanCriticos.textContent = totalCriticos;
        if (spanEmRisco)   spanEmRisco.textContent  = totalEmRisco;

        console.log(`[KPIs] Críticos: ${totalCriticos} | Em risco: ${totalEmRisco}`);
    },

    /**
     * Percorre a telemetria_detalhada e atualiza o status de cada linha
     * da tabela. Usa o status_geral mais recente (último registro) por display.
     */
    _atualizarStatusTabela(dados) {
        const telemetria = dados.telemetria_detalhada ?? [];

        // Agrupa os registros por idDisplay e pega o mais recente
        const statusPorDisplay = {};
        for (const registro of telemetria) {
            const id = registro.idDisplay;
            // Os registros chegam ordenados por dataHora; sobrescreve sempre
            // com o mais recente (último do array = mais recente)
            statusPorDisplay[id] = registro.status_geral;
        }

        console.log("[StatusTabela] Status por display:", statusPorDisplay);

        // Atualiza cada linha da tabela
        for (const [idDisplay, statusGeral] of Object.entries(statusPorDisplay)) {
            const linha = document.getElementById(`d-${idDisplay}`);
            if (!linha) continue;

            const celulasStatus = linha.querySelectorAll(".status-container .g-status");
            if (!celulasStatus.length) continue;

            const config = this._statusConfig[statusGeral] ?? {
                classe: "status-desconhecido",
                label: statusGeral ?? "Desconhecido",
            };

            for (const gStatus of celulasStatus) {
                // Remove qualquer classe de status anterior e aplica a nova
                gStatus.classList.remove(
                    "status-estavel",
                    "status-critico",
                    "status-atencao",
                    "status-desconhecido"
                );
                gStatus.classList.add(config.classe);

                // Atualiza o texto do label
                const textoSpan = gStatus.querySelector("span");
                if (textoSpan) {
                    textoSpan.textContent = config.label;
                }
            }
        }
    },
};


/**
 * Inicialização
 *
 * Aguarda o carregarDisplays.js terminar antes de rodar o controller de KPIs.
 * Como carregarDisplays.js usa fetch assíncrono, usamos um pequeno retry
 * que espera as linhas aparecerem na tabela (máx. 10 tentativas / 5s).
 */
(function aguardarTabela() {
    const TENTATIVAS_MAX = 10;
    const INTERVALO_MS   = 500;
    let tentativas = 0;

    function verificar() {
        // Considera que a tabela está pronta quando há pelo menos 1 <tr>
        // além do cabeçalho (primeiro_item)
        const linhas = document.querySelectorAll("#lista_displays tr:not(#primeiro_item)");

        if (linhas.length > 0) {
            console.log("[DisplaysKpiController] Tabela pronta, iniciando KPIs...");
            DisplaysKpiController.init();
            return;
        }

        tentativas++;
        if (tentativas < TENTATIVAS_MAX) {
            setTimeout(verificar, INTERVALO_MS);
        } else {
            // Tabela vazia mas tenta mesmo assim (ex: empresa sem displays)
            console.warn("[DisplaysKpiController] Tabela sem linhas após espera, tentando mesmo assim.");
            DisplaysKpiController.init();
        }
    }

    document.addEventListener("DOMContentLoaded", verificar);
})();