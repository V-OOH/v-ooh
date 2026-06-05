const ambiente_processo = "desenvolvimento";
const caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

const app = express();
const indexRouter = require("./src/routes/index");
const empresaRouter = require("./src/routes/empresa");
const usuarioRouter = require("./src/routes/usuarios");
const maquinaRouter = require("./src/routes/maquina");
const componenteRouter = require("./src/routes/componente");
const displayRouter = require("./src/routes/display");
const configRouter = require("./src/routes/config");
const liaRouter = require("./src/routes/lia");
const incidenteRouter = require("./src/routes/incidentes");
const recomendacaoRouter = require("./src/routes/recomendacao");
const alertasRouter = require("./src/routes/alertasRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/empresa", empresaRouter);
app.use("/usuarios", usuarioRouter);
app.use("/maquina", maquinaRouter);
app.use("/componente", componenteRouter);
app.use("/display", displayRouter);
app.use("/display_componentes",display_componentesRouter);
app.use("/config", configRouter);
app.use("/lia", liaRouter);
app.use("/incidentes", incidenteRouter);
app.use("/recomendacao", recomendacaoRouter);
app.use("/api/alertas", alertasRouter);

app.listen(PORTA_APP, function () {
  console.log(
    `
    ██     ██  ███████   ███████  ██     ██
    ██     ██ ██     ██ ██     ██ ██     ██
    ██     ██ ██     ██ ██     ██ ██     ██
    ██     ██ ██     ██ ██     ██ █████████
     ██   ██  ██     ██ ██     ██ ██     ██
      ██ ██   ██     ██ ██     ██ ██     ██
       ███     ███████   ███████  ██     ██


    Aplicação executando em: http://${HOST_APP}:${PORTA_APP}\n
    Você está no ambiente de ${process.env.AMBIENTE_PROCESSO}`,
  );
});
