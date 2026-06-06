const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken:    process.env.AWS_SESSION_TOKEN
    }
});

async function downloadRelatorio(req, res) {
    try {
       const { arquivo } = req.params;

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:    "relatorios/" + arquivo
        });

        const objeto = await s3.send(command);
        console.log("[Relatorio] ContentType:", objeto.ContentType);
        console.log("[Relatorio] ContentLength:", objeto.ContentLength);

        const chunks = [];
        for await (const chunk of objeto.Body) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        console.log("[Relatorio] Buffer size:", buffer.length);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${arquivo}"`);
        res.setHeader("Content-Length", buffer.length);
        res.send(buffer);

    } catch (err) {
        console.error("[Relatorio] Erro:", err);
        res.status(404).json({ erro: "Arquivo não encontrado" });
    }
}

module.exports = { downloadRelatorio };