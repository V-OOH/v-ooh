
//  Buscar o JSON no S3

const S3_URL = "/api/alertas/dados-dashboard";

const AlertaService = {

    // Função assincrona que bsuca o JSON no Bucket
    async buscarDados() {
        const response = await fetch(S3_URL, { cache: "no-cache" });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

};
