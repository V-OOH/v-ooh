const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken:    process.env.AWS_SESSION_TOKEN
    }
})

function buscarDadosRede(idEmpresa) {
    const hoje = new Date()
        .toLocaleDateString('pt-BR')
        .split('/')
        .join('_')

    const comando = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:    `client/json_Rede${idEmpresa}_${hoje}.json`
    })

    return s3.send(comando)
        .then(resposta => resposta.Body.transformToString())
        .then(conteudo => JSON.parse(conteudo))
}

module.exports = { buscarDadosRede }