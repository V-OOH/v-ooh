// BUscar dados do bucket
const S3_URL = "/api/alertas/dados-dashboard";

const AlertaService = {

  async buscarDados() {
    const response = await fetch(S3_URL, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

};
