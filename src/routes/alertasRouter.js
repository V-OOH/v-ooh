const express = require("express");
const router = express.Router();

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

router.get("/dados-dashboard", async (req, res) => {
    try {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, "0");
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const ano = hoje.getFullYear();
        const key = `client/dados_dashboard_alertas_empresa_2_${dia}_${mes}_${ano}.json`;

        console.log("Buscando chave:", key);
        console.log("Credenciais carregadas:", {
            keyId: process.env.AWS_ACCESS_KEY_ID?.slice(0, 8) + "...",
            hasSecret: !!process.env.AWS_SECRET_ACCESS_KEY,
            hasToken: !!process.env.AWS_SESSION_TOKEN
        });

        const command = new GetObjectCommand({
            Bucket: "samarinha",
            Key: key
        });

        console.log("Enviando comando para S3...");

        const response = await Promise.race([
            s3.send(command),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("TIMEOUT: S3 não respondeu em 10s")), 10000)
            )
        ]);

        console.log("Resposta recebida do S3!");

        const streamToString = (stream) =>
            new Promise((resolve, reject) => {
                const chunks = [];
                stream.on("data", (chunk) => chunks.push(chunk));
                stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
                stream.on("error", reject);
            });

        console.log("Lendo body do S3...");
        const bodyString = await response.Body.transformToString("utf-8");
        console.log("Body lido, tamanho:", bodyString.length);

        const json = JSON.parse(bodyString);
        console.log("JSON parseado, keys:", Object.keys(json));

        res.json(json);
    } catch (erro) {
        console.error("Erro completo:", erro.message);
        console.error("Code:", erro.Code || erro.code);
        res.status(500).json({ erro: "Falha ao buscar dados", detalhe: erro.message });
    }
});

module.exports = router;