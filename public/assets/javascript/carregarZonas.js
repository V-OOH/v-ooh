document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista_displays");
  const referencia = document.getElementById("primeiro_item");

  fetch("/maquina/buscarZona", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresa: sessionStorage.FKEMPRESA,
    }),
  })
    .then((resposta) => resposta.json())
    .then((listaZonas) => {
      console.log("Dados recebidos:", listaZonas);

      let html = "";
      for (let i = 0; i < listaZonas.length; i++) {
        const zona = listaZonas[i];

        html += `
        <tr>
            <td class="id-display">${zona.nome_zona}</td>
            <td>${zona.quantidade_displays}</td>
            <td>5</td>
            <td>${zona.descricao_zona}</td>
            <td class="status-container">
                <div class="g-status">
                    <div class="status"></div>
                    <span>Estável</span>
                </div>
            </td>
            <td>100%</td> 
            <td>
            </td>
        </tr>
        `;
      }

      const template = document.createElement("template");
      template.innerHTML = html;
      referencia.after(template.content);
    })
    .catch((erro) => {
      console.error("Erro ao buscar zonas:", erro);
    });
});



