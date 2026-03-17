import csv;
import datetime;
import time;
from datetime import date;

def ler_dados():
    while True:
        with open(f"coleta_{datetime.date.today()}.csv", mode="r") as arquivo_csv:
            ler = csv.reader(arquivo_csv)
            separar_dados(ler)
        time.sleep(30)

        
def separar_dados(dados):
    contador = 0

    valores_cpu_porcentagem = []
    valores_memoria_porcentagem = []
    valores_disco_porcentagem = []
    valores_data_porcentagem = []

    for linha in dados:
        contador+=1

        if (contador > 1):
            valores_cpu_porcentagem.append(linha[0])
            valores_disco_porcentagem.append(linha[1])
            valores_memoria_porcentagem.append(linha[2])
            valores_data_porcentagem.append(linha[3])   

    calcular_metricas(
        valores_cpu_porcentagem,
        valores_disco_porcentagem,
        valores_memoria_porcentagem, 
        valores_data_porcentagem
    )
    
def calcular_metricas(dados_cpu_porcentagem, dados_disco_porcentagem, dados_memoria_porcentagem, dados_data_porcentagem):

    tamanho_array = len(dados_memoria_porcentagem)
    soma_valores_cpu_porcentagem = 0
    soma_valores_memoria_porcentagem = 0
    soma_valores_disco_porcentagem = 0

    comeco_laco = 0

    # 12 PORQUE O SCRIPT DE COLETA PEGA DE 5 EM 5 MINUTOS, O QUE DÁ 12 COLETAS POR HORA
    if (len(dados_memoria_porcentagem) >= 12):
        comeco_laco = tamanho_array - 12
    
    for i in range(comeco_laco, tamanho_array):
        soma_valores_cpu_porcentagem += float(dados_cpu_porcentagem[i])
        soma_valores_disco_porcentagem += float(dados_disco_porcentagem[i])
        soma_valores_memoria_porcentagem += float(dados_memoria_porcentagem[i])
            
    media_memoria_porcentagem = soma_valores_memoria_porcentagem / tamanho_array
    media_cpu_porcentagem = soma_valores_cpu_porcentagem / tamanho_array
    media_disco_porcentagem = soma_valores_disco_porcentagem / tamanho_array

    print("MÉDIA DE USO DA CPU NA ÚLTIMA HORA: ", media_cpu_porcentagem, "%")
    print("MÉDIA DE USO DA MEMÓRIA NA ÚLTIMA HORA: ", media_memoria_porcentagem, "%")
    print("MÉDIA DE USO DA DISCO NA ÚLTIMA HORA: ", media_disco_porcentagem, "%")
            
ler_dados()
        