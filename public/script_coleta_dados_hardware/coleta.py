import psutil;
import time;
import os;
import csv;
from datetime import date, datetime

INTERVALO = 3


def captura_dados():
    final_io = psutil.disk_io_counters()

    pular = "\n" * 2

    while True: 

        porcentagem_uso_da_cpu = psutil.cpu_percent(INTERVALO)
        cpu_freq = psutil.cpu_freq()

        porcentagem_uso_do_disco = psutil.disk_usage("/").percent 
        initial_io = psutil.disk_io_counters()
        
        read_bytes_diff = initial_io.read_bytes - final_io.read_bytes 
        write_bytes_diff = initial_io.write_bytes - final_io.write_bytes
        
        read_rate_Bps = read_bytes_diff / INTERVALO
        write_rate_Bps = write_bytes_diff / INTERVALO
        
        memoria = psutil.virtual_memory();  
        memoria_total = memoria.total;  
        memoria_disponivel = memoria.available
        memoria_percentual = (memoria_disponivel / memoria_total) * 100

        timestamp_atual = datetime.now()

        timestamp_formatado = timestamp_atual.isoformat()

        conteudo_csv = {
            "usuario": os.getlogin(),
            "porcentagem_uso_da_cpu": porcentagem_uso_da_cpu,
            "Frequência Atual": int(cpu_freq.current),
            "Frequência Mínima": int(cpu_freq.min),
            "Frequência Máxima": int(cpu_freq.max),

            "porcentagem_uso_do_disco": porcentagem_uso_do_disco,
            "read_rate_Bps": int(read_rate_Bps),
            "write_rate_Bps": int(write_rate_Bps),

            "memoria_percentual": memoria_percentual,
            "memoria_total": int(memoria_total),
            "memoria_disponivel": int(memoria_disponivel),

            "data": timestamp_formatado,
        }
        inserir_arquivo_csv(conteudo_csv)    
        time.sleep(INTERVALO)    
        final_io = psutil.disk_io_counters()


def inserir_arquivo_csv(dados):

    print(dados)

    nome_arquivo = f"coleta_{date.today()}.csv"

    with open(nome_arquivo, mode='a', newline='') as arquivo_csv:
        writer = csv.DictWriter(arquivo_csv, fieldnames=dados.keys(), delimiter=';')

        if arquivo_csv.tell() == 0:
            writer.writeheader()

        writer.writerow(dados)

captura_dados()
