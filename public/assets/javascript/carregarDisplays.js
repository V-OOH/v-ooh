document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista_displays");
    const referencia = document.getElementById("primeiro_item");

    let html = "";

    fetch("/display/buscarDisplays", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: sessionStorage.FKEMPRESA,
        })
    })
    .then(resposta => {
        console.log("ESTOU NO THEN DO buscarUsuarios()!");
        console.log(resposta);
        
        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                if (json.length === 0) {
                    lista.innerHTML = "<p>Nenhum display encontrado.</p>";
                } else {
                    for (let i = 0; i < json.length; i++) {
                        const display = json[i];

                        // Tratamento de localização nula
                        const localizacao = display.logradouro 
                            ? `${display.logradouro}, ${display.numero} - ${display.uf}`
                            : "Localização não cadastrada";

                        html += `
                        <tr id="d-${display.id}" onclick='abrirDashboard(${display.id})'>
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

                document.getElementById('total_display').textContent = json[0].totalDisplays;

                    const template = document.createElement("template");
                    template.innerHTML = html;
                    referencia.after(template.content);
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar a busca!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
    .catch(function (erro) {
        console.log("Erro no Fetch:", erro);
    });
});