async function carregarMapa2() {

    const resposta = await fetch("/maquina/listarZona", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresa: sessionStorage.FKEMPRESA
        })
    });

    if (!resposta.ok) {
        console.error("Erro ao buscar zonas");
        return;
    }

    const json = await resposta.json();

    console.log(json);

    const grupos = json.map((item, index) => {

        const cores = [
            "#6D33FF",
            "#C6FF33",
            "#FF5733",
            "#33C1FF",
            "#FF33B8",
            "#33FF8A"
        ];

        return {
            nome: item.nome,
            cor: cores[index % cores.length],

            enderecos: item.enderecos_brutos
                .split(";")
                .map(endereco => endereco.trim())
        };
    });

    console.log(grupos);

    // ================= MAPA =================

    const map = L.map("map").setView([-23.55, -46.64], 15);

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { attribution: "© OpenStreetMap contributors © CARTO" }
    ).addTo(map);

    function criarIcone(cor) {
        return L.divIcon({
            className: "",
            iconSize: [32, 42],
            iconAnchor: [16, 42],
            popupAnchor: [0, -42],
            html: `
                <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 42 16 42C16 42 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="${cor}"/>
                    <circle cx="16" cy="16" r="6" fill="white" opacity="0.9"/>
                </svg>
            `,
        });
    }

    const aguardar = (ms) => new Promise((res) => setTimeout(res, ms));

    async function geocodificar(endereco) {

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "VOOH_Dashboard_App/1.0"
            },
        });

        const data = await response.json();

        if (data.length > 0) {
            return [
                parseFloat(data[0].lat),
                parseFloat(data[0].lon)
            ];
        }

        return null;
    }

    async function plotarGrupos() {

        for (const grupo of grupos) {

            const coordenadas = [];

            for (const endereco of grupo.enderecos) {

                try {

                    const coord = await geocodificar(endereco);

                    if (coord) {

                        coordenadas.push(coord);

                        L.marker(coord, {
                            icon: criarIcone(grupo.cor)
                        })
                            .addTo(map)
                            .bindPopup(`
                                <b style="color:${grupo.cor}">
                                    ${grupo.nome}
                                </b>
                                <br>
                                ${endereco}
                            `);
                    }

                } catch (error) {
                    console.error(`Erro ao buscar ${endereco}:`, error);
                }

                await aguardar(1200);
            }

            if (coordenadas.length === 2) {

                L.polyline(coordenadas, {
                    color: grupo.cor,
                    weight: 2,
                    opacity: 0.8,
                }).addTo(map);

            } else if (coordenadas.length >= 3) {

                L.polygon(coordenadas, {
                    color: grupo.cor,
                    weight: 2,
                    opacity: 0.8,
                    fillColor: grupo.cor,
                    fillOpacity: 0.15,
                })
                    .addTo(map)
                    .bindPopup(`<b>${grupo.nome}</b>`);
            }
        }
    }

    plotarGrupos();
}
