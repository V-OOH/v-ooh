// Função de fechar modal das dashboard
function fecharModalDashboard() {
  const modal = document.getElementById("dashboard");

  modal.style.display = "none";
}

// Função para abrir o modal da dashboard
function abrirDashboard(idDisplay) {
  // document.getElementById("dashboard").style.display = "flex";
    window.location.href = `rede.html?id=${idDisplay}`;
  atualizar(idDisplay);
}

// Atualizar dashboard
function atualizar(idDisplay) {
  let data = new Date();

  let hora = data.getHours();

  let horaFormatada = hora < 10 ? `0${hora}` : hora;

  let minutos = data.getMinutes();

  let minutosFormatado = minutos < 10 ? `0${minutos}` : minutos;

  let segundos = data.getSeconds();

  let segundosFormatado = segundos < 10 ? `0${segundos}` : segundos;

  let horarioFormatada = `${horaFormatada}:${minutosFormatado}:${segundosFormatado}`;

  let campoHora = (document.getElementById("horario").innerHTML =
    horarioFormatada);
}
