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



module.exports = request;
