async function baixarRelatorio() {
    const hoje = new Date();
    const ano  = hoje.getFullYear();
    const mes  = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia  = String(hoje.getDate()).padStart(2, "0");
    const arquivo = `relatorio_dooh_${ano}-${mes}-${dia}.pdf`;

    console.log("[Relatorio] Buscando:", arquivo);

    const res = await fetch(`/relatorio/${arquivo}`);

    if (!res.ok) {
        console.error("[Relatorio] Erro:", res.status, res.statusText);
        alert("Relatório não encontrado para hoje.");
        return;
    }

    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = arquivo;
    link.click();
    URL.revokeObjectURL(url);
}