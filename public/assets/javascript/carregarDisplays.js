function renderizarTabela(dados) {
  const referencia = document.getElementById("primeiro_item");
  const lista = document.getElementById("lista_displays");

  // Remove linhas antigas (mantendo o cabeçalho)
  const linhasAntigas = lista.querySelectorAll("tr:not(#primeiro_item)");
  linhasAntigas.forEach((linha) => linha.remove());

  if (dados.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5" style="text-align: center;">Nenhum display encontrado.</td>`;
    lista.appendChild(tr);
    return;
  }

  let html = "";
  for (let i = 0; i < dados.length; i++) {
    const display = dados[i];

    // Tratamento de localização nula
    const localizacao = display.logradouro
      ? `${display.logradouro}, ${display.numero} - ${display.uf}`
      : "Localização não cadastrada";

    html += `
            <tr id="d-${display.id}" onclick='abrirDashboard(${display.id})' style="cursor: pointer;">
                <td class="id-display">D${display.id}</td>
                <td>${display.ip}</td>
                <td class="mac">${display.mac}</td>
                <td>${localizacao}</td>
                <td class="status-container">
                    <div class="g-status status-estavel">
                        <div class="status"></div>
                        <span>Estável</span>
                    </div>
                </td>
            </tr>
            `;
  }

  const template = document.createElement("template");
  template.innerHTML = html;
  referencia.after(template.content);

  if (dados[0] && dados[0].totalDisplays !== undefined) {
    document.getElementById("total_display").textContent = dados[0].totalDisplays;
  }
}

function carregarTodosDisplays() {
  fetch("/display/buscarDisplays", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkEmpresa: sessionStorage.FKEMPRESA,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          renderizarTabela(json);
        });
      } else {
        console.log("Houve um erro ao tentar realizar a busca!");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log("Erro no Fetch:", erro);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarTodosDisplays();
});
