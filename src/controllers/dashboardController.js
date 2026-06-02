const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    ...(process.env.AWS_SESSION_TOKEN && {
      sessionToken: process.env.AWS_SESSION_TOKEN
    })
  }
});

const BUCKET = process.env.S3_BUCKET || "s3-grupovooh-raw";

// Lê um stream do S3 e devolve string
async function streamParaString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end",  () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
}

// GET /dashboard/zonas/:idEmpresa
async function buscarDashboardZonas(req, res) {
  const { idEmpresa } = req.params;

  if (!idEmpresa) {
    return res.status(400).json({ erro: "idEmpresa obrigatório" });
  }

  try {
    const comando = new GetObjectCommand({
      Bucket: BUCKET,
      Key:    `client/dashZonas_Empresa${idEmpresa}.json`
    });

    const resposta = await s3.send(comando);
    const conteudo = await streamParaString(resposta.Body);
    const dados    = JSON.parse(conteudo);

    return res.status(200).json(dados);

  } catch (erro) {
    if (erro.name === "NoSuchKey") {
      return res.status(404).json({
        erro: `Nenhum dado encontrado para a empresa ${idEmpresa}`
      });
    }

    console.error("[dashboardController] Erro ao buscar JSON S3:", erro.message);
    return res.status(500).json({ erro: "Erro interno ao buscar dados do dashboard" });
  }
}

module.exports = { buscarDashboardZonas };
