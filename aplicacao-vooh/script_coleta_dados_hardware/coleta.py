import psutil;
import time;
import os;
import csv;
from datetime import date, datetime

def captura_dados():
        
    pular = "\n" * 2
    # CAPTURA DE DADOS DA CPU
    while True: 
        porcentagem_uso_da_cpu = psutil.cpu_percent(interval=None)

        # CAPTURA DE DADOS DO DISCO
        porcentagem_uso_do_disco = psutil.disk_usage("/").percent 

        # CAPTURA DE DADOS DA MEMÓRIA
        memoria = psutil.virtual_memory();  
        memoria_total = memoria.total;  
        memoria_disponivel = memoria.available
        memoria_percentual = (memoria_disponivel / memoria_total) * 100

        timestamp_atual = datetime.now()
        # timestamp_formatado = timestamp_atual.strftime("%d-%m-%Y %H:%M:%S")
        timestamp_formatado = timestamp_atual.isoformat()

        # TRANSFORMANDO EM DICIONÁRIO COM OS  DADOS
        conteudo_csv = {
            "usuario": os.getlogin(),
            "porcentagem_uso_da_cpu": porcentagem_uso_da_cpu,
            "porcentagem_uso_do_disco": porcentagem_uso_do_disco,
            "memoria_percentual": memoria_percentual,
            "data": timestamp_formatado
        }

        # print(conteudo_csv)
        # MANDANDO OS DADOS PARA INSERIR NO ARQUIVO .CSV
        inserir_arquivo_csv(conteudo_csv)    
        # INTERVALO DE
        # TEMPO PARA CAPTURA
        time.sleep(3)    
        # captura_dados()

def inserir_arquivo_csv(dados):

    print(dados)

    # PEGANDO A DATA PARA COLOCAR NO ARQUIVO
    nome_arquivo = f"coleta_{date.today()}.csv"

    with open(nome_arquivo, mode='a', newline='') as arquivo_csv:
        writer = csv.DictWriter(arquivo_csv, fieldnames=dados.keys(), delimiter=';')

        # VALIDAÇÃO COM TELL() QUE É UMA FUNÇÃO QUE VERIFICA SE ESTÁ VAZIO OU NÃO
        if arquivo_csv.tell() == 0:
            writer.writeheader()

        # ONDE ESTOU ESCREVENDO OS DADOS NO ARQUIVO
        writer.writerow(dados)

captura_dados()