// ============================================================
//  alertaController.js  –  Orquestrador do dashboard
//  Responsabilidades:
//    1. Inicializar o dashboard (chamar o service)
//    2. Atualizar os KPIs no DOM
//    3. Tratar erros e exibir feedback ao usuário
//    4. Delegar a renderização dos gráficos para o AlertaApex
// ============================================================

const AlertaController = {

  // ----------------------------------------------------------
  //  Ponto de entrada: chamado pelo DOMContentLoaded
  // ----------------------------------------------------------
  async init() {
    try {
      const dados = await AlertaService.buscarDados();

      console.log("DADOS RECEBIDOS DO S3:", dados);

      this.atualizarKPIs(dados.kpis);
      AlertaApex.renderizarTodos(dados);

    } catch (erro) {
      console.error("Falha ao inicializar dashboard:", erro);
      this.exibirErro(erro.message);
    }
  },

  // ----------------------------------------------------------
  //  Atualiza os cards de KPI no HTML
  // ----------------------------------------------------------
  atualizarKPIs(kpis) {
    if (!kpis) return;

    // Card "Visão dos Dispositivos" — "X / Y"
    const spanValues = document.querySelectorAll(".stat-value span");
    if (spanValues.length >= 3) {
      spanValues[0].textContent = kpis.displays_precisam_atencao ?? "--";
      spanValues[2].textContent = kpis.total_displays            ?? "--";
    }

    // Linha lateral "N sem alertas"
    const semAlertas = document.querySelector(".side-info");
    if (semAlertas) {
      semAlertas.textContent = `${kpis.displays_sem_alertas ?? "--"} sem alertas`;
    }

    // Footer: "N precisam de atenção"
    const footerAtencao = document.querySelector(".card-footer span:nth-child(2)");
    if (footerAtencao) {
      footerAtencao.textContent = `${kpis.displays_precisam_atencao ?? "--"} precisam de atenção`;
    }

    // Footer: "N total"
    const footerTotal = document.querySelector(".card-footer span:last-child");
    if (footerTotal) {
      footerTotal.textContent = `${kpis.total_displays ?? "--"} total`;
    }

    // Card "Funcionamento Global" — percentual em alerta
    const statValueDisp = document.querySelector(".stat-value-disp");
    if (statValueDisp) {
      statValueDisp.textContent = `${kpis.percentual_em_alerta ?? "--"}%`;
    }

    // Footer "Funcionamento Global" — variação vs ontem
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

  // ----------------------------------------------------------
  //  Exibe banner de erro visível na tela
  // ----------------------------------------------------------
  exibirErro(mensagem) {
    const container = document.querySelector(".graficos") || document.body;
    const div = document.createElement("div");
    div.style.cssText =
      "padding:16px;background:#DC3545;color:#fff;border-radius:8px;margin:16px;font-weight:bold;";
    div.textContent = `⚠️ Não foi possível carregar os dados: ${mensagem}`;
    container.prepend(div);
  }

};

// ============================================================
//  Inicializa quando o DOM estiver pronto
// ============================================================
document.addEventListener("DOMContentLoaded", () => AlertaController.init());
