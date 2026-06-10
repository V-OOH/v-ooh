const btnCloseChat = document.getElementById("close-chat");
const chatBody = document.querySelector(".chat-body");
const iconChat = document.getElementById("chat-icon");
const baloons = document.querySelector(".baloon");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const baloes = document.querySelectorAll(".baloon .b");

  const intervalo = 280;

  baloes.forEach((balao, index) => {
    const pontoDeAtivacao = index * intervalo;

    if (currentScroll <= pontoDeAtivacao && window.innerWidth >= 1024) {
      balao.style.display = "flex";
      balao.style.opacity = "1";
    } else {
      balao.style.display = "none";
      balao.style.opacity = "0";
    }
  });
});

btnCloseChat.addEventListener("click", () => {
  chatBody.style.display = "none";
  baloons.style.display = "flex";
});

iconChat.addEventListener("click", () => {
  if (chatBody.style.display === "flex") {
    chatBody.style.display = "none";
    baloons.style.display = "flex";
  } else {
    chatBody.style.display = "flex";
    baloons.style.display = "none";
  }
});

// Função para scroll
function scroll() {
  document.querySelector(".scroll").scrollTop =
    document.querySelector(".scroll").scrollHeight;
}

const divError = document.getElementById("error");

const msgErroSpan = divError.querySelector("span");

// Função para obter a data e hora
function obterDataHora() {
  const data = new Date();
  let dia = data.getDate();
  let mesExtenso = data.toLocaleDateString("pt-BR", { month: "long" });
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minutos = data.getMinutes();

  let horaFormatada = hora < 10 ? `0${hora}` : hora;
  let minutosFormatado = minutos < 10 ? `0${minutos}` : minutos;

  let dataHora = `${dia} de ${mesExtenso} de ${ano} às ${horaFormatada}:${minutosFormatado}`;

  return dataHora;
}

// Obter a última mensagem do container
function pegarUltimaMensagem() {
  return document.querySelector(".scroll > div:last-of-type");
}

// Função de envio de mensagem do usuário
function usuario(msg) {
  let html = `
  <div class="you-box">
  <span class="box-you">${msg}</span>
  <span>Você · ${obterDataHora()}</span>
  </div>
  `;

  const referencia = pegarUltimaMensagem();
  const containerPrincipal = document.getElementById(".scroll");

  if (referencia instanceof Element) {
    referencia.insertAdjacentHTML("afterend", html);
  } else {
    containerPrincipal.insertAdjacentHTML("beforeend", html);
  }
  scroll();
}

// Função de enviar a mensagem da LIA
function lia(msg) {
  let html = `
  <div class="lia-box" id="lia">
  <span class="box-lia">${msg}</span>
  <span>Lia · ${obterDataHora()}</span>
  </div>
  `;

  const referencia = pegarUltimaMensagem();
  const containerPrincipal = document.getElementById("lia");

  if (referencia) {
    referencia.insertAdjacentHTML("afterend", html);
  } else {
    containerPrincipal.insertAdjacentHTML("beforeend", html);
  }
  scroll();
}

// Função para evitar spamar a API
function aguardar() {
  const area = document.getElementById("msg");
  const button = document.getElementById("send-message");
  console.log("Aguarde 10s");

  area.disabled = true;
  button.disabled = true;

  setTimeout(() => {
    area.disabled = false;
    button.disabled = false;
    console.log("Input liberada e botão liberado");
  }, 10000);
}

// Exibe erro na DIV
function erro(erro) {
  divError.style.display = "flex";
  msgErroSpan.innerHTML = `${erro}`;
  setTimeout(() => {
    divError.style.display = "none";
    msgErroSpan.innerHTML = "";
  }, 5000);
}

// Enviar mensagem
async function enviarMensagem() {
  let mensagem = document.getElementById("msg").value.trim();

  msg.value = "";

  if (mensagem == "" || mensagem == undefined) {
    erro("Mensagem está vazia!");
    return;
  }

  usuario(mensagem);
  tocarAudio();

  try {
    const response = await fetch("/lia/perguntar-lia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mensagem: mensagem,
      }),
    });

    const data = await response.json();

    console.log("Resposta: ", data.resposta);

    if (response.ok && data.resposta) {
      lia(`${data.resposta}`);
      tocarAudio();
      aguardar();
    } else {
      throw new Error(data.error || data.resposta || "Erro no servidor");
    }
  } catch (error) {
    console.log(error);
    erro("Ocorreu um erro inesperado.");
  }
}

const btnSend = document.getElementById("send-message");

btnSend.onclick = async (e) => {
  e.preventDefault();
  tocarAudio();
  await enviarMensagem();
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    tocarAudio();
    lia("Olá!, Como posso te ajudar?");
  }, 2000);
});

const baloesMensagem = document.querySelectorAll(".baloon .b");

// Envio rápido
async function enviarRapido(id) {
  mensagem = "";

  if (id == 1) {
    mensagem = "Contratar os serviços da VOOH";
    tocarAudio();
  } else if (id == 2) {
    mensagem = "O que é a tecnologia DOOH?";
    tocarAudio();
  } else if (id == 3) {
    mensagem = "Olá, tudo bem?";
    tocarAudio();
  }

  if (chatBody.style.display === "flex") {
    chatBody.style.display = "none";
    baloons.style.display = "flex";
  } else {
    chatBody.style.display = "flex";
    baloons.style.display = "none";
  }

  document.getElementById("msg").value = mensagem;

  await enviarMensagem(mensagem);
}

// Som de chat
const som = new Audio(
  "../assets/audio/dragon-studio-new-notification-3-398649.mp3",
);

som.volume = 1.0; // 100%
som.loop = false;

// Função para reproduzir
function tocarAudio() {
  som
    .play()
    .then(() => {
      console.log("Áudio iniciado com sucesso.");
    })
    .catch((error) => {
      console.error("Falha ao reproduzir áudio:", error);
    });
}
