const { GoogleGenAI } = require("@google/genai");

async function request(mensagem) {
  const chatAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = process.env.MODEL;

  if (chatAI == undefined || chatAI == "") {
    return console.log("Configuração de API falhou!");
  }

  const comportamento =
    "Você é a LIA, a embaixadora digital da plataforma da VOOH, empresa de monitoramento de displays DOOH para empresas de DOOH. Seu papel é receber os visitantes, tirar dúvidas sobre nossos serviços e mostrar o valor do que fazemos de forma envolvente e clara. Diretrizes de Comportamento: linguagem acessível; foco no Benefício, não na Função; entusiasmo Contido; sempre que responder uma dúvida, tente encerrar com um incentivo ou uma pergunta que leve o usuário a querer conhecer mais; se o usuário perguntar algo muito profundo, dê uma resposta simplificada e sugira que ele entre em contato com nossa equipe. Responta curta sem markdown. Use poucas palavras, apenas o essencial!";

  try {
    const ai = await chatAI.models.generateContent({
      model: model,
      contents: comportamento + mensagem,
    });

    const response = ai.text;
    const tokensUsados = ai.usageMetadata;

    console.log("Tokens usados:", tokensUsados);

    return response;
  } catch (error) {
    if (error.message.includes("429")) {
      console.error(
        "\nERRO: Limite de requisições atingido. Aguarde alguns segundos.\n",
      );
    }
    throw error;
  }
}


async function recomendacaoIncidente(ultimaLeitura) {
    const chatAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = process.env.MODEL;
    
    const kpis = ultimaLeitura.kpis;
    const displaysOffline = ultimaLeitura.displaysOffline || [];

    if (displaysOffline.length === 0) {
        return "Tudo certo! Nenhum display offline no momento.";
    }

    const comportamento = `
Você é a LIA, assistente inteligente da dashboard de monitoramento da VOOH.

A VOOH monitora displays DOOH espalhados em diversas localidades e sua função é analisar os dados de incidentes obtidos a partir do JSON de monitoramento gerado pelo sistema.

Seu objetivo é auxiliar gestores operacionais a decidir onde enviar equipes técnicas para resolver problemas de disponibilidade.

Ao analisar os dados:

- Considere os displays offline encontrados no JSON.
- Considere a quantidade de displays afetados.
- Considere os endereços, bairros e zonas dos displays.
- Considere o motivo da indisponibilidade quando disponível.
- Identifique os locais mais críticos.
- Gere uma recomendação operacional para o gestor.

Regras:

- Responda em português do Brasil.
- Seja objetiva e profissional.
- Produza no máximo 3 frases.
- Não use markdown.
- Não invente informações que não estejam nos dados.
- Quando houver incidentes, recomende o envio de uma equipe técnica.
- Quando houver muitos displays offline, destaque a criticidade da situação.
- Quando não houver incidentes, informe que o ambiente está operando normalmente.
`;

const resumo = { 
        displaysOffline: displaysOffline.map(displays => ({
        endereco: displays.logradouro,
        bairro: displays.bairro,
        motivo: displays.motivoOffline
    }))
};

    const prompt = `
Dados atuais do monitoramento:

Data: ${ultimaLeitura.Data}
Hora: ${ultimaLeitura.Hora}
Total de displays: ${kpis.quantidadeDisplays}
Displays offline: ${kpis.quantidadeOffline}
Disponibilidade: ${kpis.disponibilidade}%

Displays offline:
${JSON.stringify(resumo, null, 2)}

Gere uma recomendação para o gestor.
`;

    try {
        const ai = await chatAI.models.generateContent({
            model: model,
            contents: comportamento + "\n\n" + prompt
        });

        console.log("Tokens usados na recomendação:", ai.usageMetadata);

        return ai.text;

    } catch (error) {
        console.error("Erro ao gerar recomendação:", error);
        throw error;
    }
}



module.exports = {request,recomendacaoIncidente};
