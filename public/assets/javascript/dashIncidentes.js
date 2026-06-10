async function buscarDadosS3() {
    const idEmpresa = sessionStorage.getItem("FKEMPRESA");

    const resposta = await fetch(`/incidentes/dados-s3/${idEmpresa}`);

    if (!resposta.ok) {
        console.error("Erro ao buscar dados:", resposta.status);
        return;
    }

    const dados = await resposta.json();

    console.log("JSON recebido do S3:", dados);

    return dados;
}

async function buscarDadosDashZonas() {
    const idEmpresa = sessionStorage.getItem("FKEMPRESA");

    const resposta = await fetch(`/dashboard/zonas/${idEmpresa}`);

    if (!resposta.ok) {
        console.error("Erro ao buscar dashZonas:", resposta.status);
        return null;
    }

    return await resposta.json();
}

function pegarUltimoDiaDashZonas(dadosZonas) {
    const dias = Object.keys(dadosZonas.dias || {});
    const ultimoDia = dias[dias.length - 1];

    return dadosZonas.dias[ultimoDia];
}

let graficoLinha;
let graficoRanking;


function pegarUltimaLeitura(dados) {
    const dias = Object.keys(dados);
    const ultimoDia = dias[dias.length - 1];

    const horas = Object.keys(dados[ultimoDia]);
    const ultimaHora = horas[horas.length - 1];

    return dados[ultimoDia][ultimaHora];
}

function atualizarKPIs(dados, dadosZonas) {
    const ultimaLeitura = pegarUltimaLeitura(dados);
    const kpis = ultimaLeitura.kpis;
    const ultimaLeituraZonas = dadosZonas ? pegarUltimoDiaDashZonas(dadosZonas) : null;
    const disponibilidadeDashZonas = ultimaLeituraZonas?.kpis?.uptimeGeral;
    const disponibilidade = disponibilidadeDashZonas ?? kpis.disponibilidade;

    document.getElementById("kpiDisplaysOff").innerHTML = kpis.quantidadeOffline;
    document.getElementById("totalDisplay").innerHTML = kpis.quantidadeDisplays;
    document.getElementById("kpiHorasOff").innerHTML = kpis.horasOffline;
    document.getElementById("kpiMTBF").innerHTML = kpis.mtbf.toFixed(2);
    document.getElementById("kpiDisponibilidade").innerHTML = `${Number(disponibilidade).toFixed(1)}%`;
    document.getElementById("comparacaoOffline").innerHTML = kpis.comparacaoOffline;
    document.getElementById("comparacaoHorasOff").innerHTML = kpis.comparacaoHorasOff;

    const comparacaoHoras = document.getElementById("comparacaoHorasOff");

if (kpis.comparacaoHorasOff > 0) {
    comparacaoHoras.innerHTML =`↑ ${kpis.comparacaoHorasOff}h em relação a ontem`;
    comparacaoHoras.style.color = "#ef4444";
    comparacaoHoras.style.backgroundColor = "rgba(227, 87, 99, 0.1)";

}
else if (kpis.comparacaoHorasOff < 0) {
    comparacaoHoras.innerHTML = `↓ ${Math.abs(kpis.comparacaoHorasOff)}h em relação a ontem`;
    comparacaoHoras.style.color = "#22c55e";
    comparacaoOffline.style.backgroundColor = 'rgba(0, 200, 83, 0.10)'
}
else {
    comparacaoHoras.innerHTML ="→ Mesmo tempo offline de ontem";
    comparacaoHoras.style.color = "#a3a3a3";
}

if(kpis.comparacaoOffline > 0){
    comparacaoOffline.innerHTML = `↑ ${kpis.comparacaoOffline} dispositivos em relação a ontem`;
    comparacaoOffline.style.color = "#ef4444"
    comparacaoOffline.style.backgroundColor = "rgba(227, 87, 99, 0.1)";

}else if(kpis.comparacaoOffline < 0){
    comparacaoOffline.innerHTML = `↓ ${Math.abs(kpis.comparacaoOffline)} dispositivos em relação a ontem`
    comparacaoOffline.style.color = "#22c55e";
    comparacaoOffline.style.backgroundColor = 'rgba(0, 200, 83, 0.10)'
}else {
    comparacaoOffline.innerHTML = 
    `→ Mesma quantidade offline de ontem`

    comparacaoOffline.style.color = "#a3a3a3"
}


const legendaMtbf = document.getElementById("comparacaoMtbf");
const legendaDisponibilidade = document.getElementById("comparacaoDisponibilidade");

if (kpis.comparacaoMtbf > 0) {
    legendaMtbf.innerHTML = `↑ ${kpis.comparacaoMtbf}h vs média dos últimos 7 dias`;
    legendaMtbf.style.color = "#22c55e";
    legendaMtbf.style.backgroundColor = 'rgba(0, 200, 83, 0.10)'

} else if (kpis.comparacaoMtbf < 0) {
    legendaMtbf.innerHTML = `↓ ${Math.abs(kpis.comparacaoMtbf)}h vs média dos últimos 7 dias`;
    legendaMtbf.style.color = "#ef4444";
    legendaMtbf.style.backgroundColor = "rgba(227, 87, 99, 0.1)";

} else {
    legendaMtbf.innerHTML = "→ Sem variação vs média dos últimos 7 dias";
    legendaMtbf.style.color = "#a3a3a3";
}

const idEmpresa = sessionStorage.getItem("FKEMPRESA");

fetch(`/incidentes/meta-disponibilidade/${idEmpresa}`)
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro ao buscar meta");
        }

        return resposta.json();
    })
    .then(dadosMeta => {

        const metaDisponibilidade = Number(dadosMeta.metaDisponibilidade);

        const legendaDisponibilidade = document.getElementById("comparacaoDisponibilidade");

        const diferencaMeta =
            Number((disponibilidade - metaDisponibilidade).toFixed(1));

        if (diferencaMeta > 0) {
            legendaDisponibilidade.innerHTML = `↑ ${diferencaMeta}% acima da meta`;
            legendaDisponibilidade.style.color = "#22c55e";
            legendaDisponibilidade.style.backgroundColor = 'rgba(0, 200, 83, 0.10)'

        } else if (diferencaMeta < 0) {

            legendaDisponibilidade.innerHTML =`↓ ${Math.abs(diferencaMeta)}% abaixo da meta`;
            legendaDisponibilidade.style.color = "#ef4444";
            legendaDisponibilidade.style.backgroundColor = "rgba(227, 87, 99, 0.1)";

        } else {

            legendaDisponibilidade.innerHTML =
                `→ Meta atingida`;

            legendaDisponibilidade.style.color = "#a3a3a3";
        }
    })
    .catch(erro => {
        console.error("Erro ao buscar meta:", erro);
    });

}

function atualizarGraficoLinha(dados) {
    const leituras = [];

    for (var dia in dados) {
        for (var hora in dados[dia]) {
            leituras.push({
                label: `${hora}`,
                valor: dados[dia][hora].novosOffline || 0
            });
        }
    }

    // Mantém somente as últimas 24 leituras
    const ultimas24 = leituras.slice(-24);

    const labels = ultimas24.map(item => item.label);
    const valores = ultimas24.map(item => item.valor);

    console.log("Labels linha:", labels);
    console.log("Valores linha:", valores);

    if (graficoLinha) {
        graficoLinha.destroy();
    }

    const optionsLinha = {
        series: [{
            name: 'Incidentes',
            data: valores
        }],
        chart: {
            type: 'line',
            height: 200,
            toolbar: { show: true }
        },
        colors: ['#7B3FF2'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 5,
            colors: ['#D9FF00']
        },
        xaxis: {
            categories: labels,
            labels: {
                show: true,
                rotate: -45
            }
        },
        title: {
            text: 'Incidentes nas últimas 24h'
        },
        legend: {
            show: false
        }
    };

    graficoLinha = new ApexCharts(
        document.querySelector("#graficoLinha"),
        optionsLinha
    );

    graficoLinha.render();
}


function atualizarGraficoRanking(dados) {
    const contagemMotivos = {};

    for (const dia in dados) {
        for (const hora in dados[dia]) {
            const displaysOffline = dados[dia][hora].displaysOffline || [];

            displaysOffline.forEach(display => {
                const motivo = display.motivoOffline || "Outros";

                if (!contagemMotivos[motivo]) {
                    contagemMotivos[motivo] = 0;
                }

                contagemMotivos[motivo]++;
            });
        }
    }

    const motivos = Object.keys(contagemMotivos);
    const valores = Object.values(contagemMotivos);

    console.log("Motivos ranking:", motivos);
    console.log("Valores ranking:", valores);

    if (graficoRanking) {
        graficoRanking.destroy();
    }

    const optionsRanking = {
        series: [{
            name: 'Incidentes',
            data: valores
        }],
        chart: {
            type: 'bar',
            height: 200,
            toolbar: {
                show: true
            }
        },
        colors: ['#6F2CF3'],
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 2,
                barHeight: '60%'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: motivos
        },
        title: {
            text: 'Ranking de motivos por incidente'
        },
        legend: {
            show: false
        }
    };

    graficoRanking = new ApexCharts(
        document.querySelector("#graficoRanking"),
        optionsRanking
    );

    graficoRanking.render();
}




function criarGraficoLinha() {
    const optionsLinha = {
        series: [{
            name: 'Incidentes',
            data: []
        }],
        chart: {
            type: 'line',
            height: 200,
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            toolbar: {
                show: true
            }
        },
        colors: ['#7B3FF2'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 5,
            colors: ['#D9FF00']
        },
        xaxis: {
            categories: []
        },
        title: {
            text: 'Incidentes nas últimas 24h'
        },
        legend: {
            show: false
        }
    };

    graficoLinha = new ApexCharts(
        document.querySelector("#graficoLinha"),
        optionsLinha
    );

    return graficoLinha.render();
}



function criarGraficoRanking() {
    const optionsRanking = {
        series: [{
            name: 'Incidentes',
            data: []
        }],
        chart: {
            type: 'bar',
            height: 200,
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            toolbar: {
                show: true
            }
        },
        colors: ['#6F2CF3'],
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 2,
                barHeight: '60%'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: []
        },
        title: {
            text: 'Ranking de motivos por incidente'
        },
        legend: {
            show: false
        }
    };

    graficoRanking = new ApexCharts(
        document.querySelector("#graficoRanking"),
        optionsRanking
    );

    return graficoRanking.render();
}

let graficoHeatmap;

function atualizarHeatmap(dados) {
    const diasSemana = [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo"
    ];

    const horas = Array.from({ length: 24 }, (_, i) => {
        return `${String(i).padStart(2, "0")}h`;
    });

    const series = diasSemana.map(dia => ({
        name: dia,
        data: horas.map(hora => ({
            x: hora,
            y: 0
        }))
    }));

    const mapaDias = {
        0: 6, 
        1: 0, 
        2: 1, 
        3: 2, 
        4: 3, 
        5: 4, 
        6: 5  
    };

    for (const data in dados) {
        const partes = data.split("_"); 

        const dataObj = new Date(
            Number(partes[2]),
            Number(partes[1]) - 1,
            Number(partes[0])
        );

        const linha = mapaDias[dataObj.getDay()];

        for (const horaCompleta in dados[data]) {
            const coluna = Number(horaCompleta.split(":")[0]);

            series[linha].data[coluna].y +=
                dados[data][horaCompleta].novosOffline || 0;
        }
    }

    if (graficoHeatmap) {
        graficoHeatmap.destroy();
    }

    const optionsHeatmap = {
        series: series,
        chart: {
            type: "heatmap",
            height: 220,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            heatmap: {
                radius: 5
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#6d33ff"],
        title: {
            text: "Mapa de Calor de Incidentes"
        }
    };

    graficoHeatmap = new ApexCharts(
        document.querySelector("#heatmap"),
        optionsHeatmap
    );

    graficoHeatmap.render();
}


window.onload = async function () {
    await criarGraficoLinha();
    await criarGraficoRanking();

    const dados = await buscarDadosS3();
    const dadosZonas = await buscarDadosDashZonas();

    atualizarGraficoLinha(dados);
    atualizarGraficoRanking(dados);
    atualizarKPIs(dados, dadosZonas);
    atualizarHeatmap(dados);
    buscarRecomendacaoIA();
};

async function buscarRecomendacaoIA() {
    const idEmpresa = sessionStorage.getItem("FKEMPRESA")

    const resposta = await fetch(`/recomendacao/recomendacaoIA/${idEmpresa}`);
    const dados = await resposta.json();

   document.getElementById("alertaIA").innerHTML = `
    <div class="tituloIA">
        <img
            src="../assets/images/49142cd8-afd8-4ea9-9cc4-a6c19a403461.avif"
            alt="LIA"
            class="lia-avatar"
        />

        <span>Recomendação da LIA</span>
    </div>

    <div class="textoIA">
        ${dados.alerta}
    </div>

    
`;
}