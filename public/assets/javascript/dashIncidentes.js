const ctx = document.getElementById('graficoLinha');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00h', '01h', '02h', '03h', '04h', '05h', '14h', '15h', '16h', '17h'],
        datasets: [{
            label: 'Incidentes',
            data: [1, 4, 4, 9, 7, 1, 11, 11, 11, 1],

            borderColor: '#7B3FF2',
            backgroundColor: '#7B3FF2',

            tension: 0.3,
            fill: false,

            pointBackgroundColor: '#D9FF00',
            pointBorderColor: '#D9FF00',
            pointRadius: 4,

            borderWidth: 2
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Incidentes nas últimas 24h'
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2
                }
            }
        }
    }
});

const ranking = document.getElementById('graficoRanking');

new Chart(ranking, {
    type: 'bar',

    data: {
        labels: ['CPU', 'RAM', 'REDE', 'DISCO', 'Outros'],

        datasets: [{
            data: [26, 22, 17, 13, 11],

            backgroundColor: '#6F2CF3',
            borderRadius: 1,
            barThickness: 18
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',

        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Ranking de motivos por incidente"
            }
        },

        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },

            y: {
                grid: {
                    display: false
                }
            }
        }
    }
});

var options = {
    
    series: [

        
        {
            name: 'Domingo',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Sábado',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Sexta',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Quinta',
            data: [
                { x: '00h', y: 0},
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Quarta',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Terça',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
        {
            name: 'Segunda',
            data: [
                { x: '00h', y: 10 },
                { x: '01h', y: 10 },
                { x: '02h', y: 10 },
                { x: '03h', y: 10 },
                { x: '04h', y: 20 },
                { x: '05h', y: 10 },
                { x: '06h', y: 10 },
                { x: '07h', y: 10 },
                { x: '08h', y: 35 },
                { x: '09h', y: 10 },
                { x: '10h', y: 10 },
                { x: '11h', y: 10 },
                { x: '12h', y: 50 },
                { x: '13h', y: 10 },
                { x: '14h', y: 10 },
                { x: '15h', y: 10 },
                { x: '16h', y: 40 },
                { x: '17h', y: 10 },
                { x: '18h', y: 10 },
                { x: '19h', y: 10 },
                { x: '20h', y: 15 },
                { x: '21h', y: 50 },
                { x: '22h', y: 100},
                { x: '23h', y: 12 }
            ]
        },
    ],

    chart: {
        type: 'heatmap',
        height: 220,
        radius: 100
    
    },

    plotOptions: { 
        heatmap: { 
            radius: 5 
        } 
    }, 

    dataLabels: {
        enabled: false
    },

    colors: ['#6d33ff'],

    title: {
        text: 'Mapa de Calor de Incidentes'
    }
};

var chart = new ApexCharts(
    document.querySelector("#heatmap"),
    options
);

chart.render();