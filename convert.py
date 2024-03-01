import json
import uuid
import requests


def contacts(dict: dict):
    id = uuid.uuid4()
    nameJson = f"Contacts/entity{id}.json"
    nameTxt = f"Contacts/entity{id}.txt"
    with open(nameJson, 'w') as file:
        json.dump(dict, file, indent=4)

    with open(nameJson, 'r', encoding='utf-8') as file:
        datos = json.load(file)

    with open(nameTxt, 'w', encoding='utf-8') as file:
        for key, value in datos.items():
            file.write(f"{key}: {value}\n")

    print(f"Conversión exitosa!")

    # URL del webhook de Discord
    webhook_url = 'https://discord.com/api/webhooks/1212950229427556382/dyJvsn6IdAs5aEUL8zEB1OTAZOh8bf7zLEMKAgVAb4K_4hwqhBAEG8arLL7IhqdonM83'

    # Abrir y leer el contenido del archivo .txt
    with open(nameJson, 'r') as file:
        file_content = file.read()

    # Construir el payload para el webhook
    payload = {
        'file': ("pandaContact.txt", file_content, 'text/plain')
    }

    # Enviar la solicitud POST al webhook de Discord
    response = requests.post(webhook_url, files=payload)

    # Verificar si la solicitud se realizó con éxito
    if response.status_code == 204:
        print("El archivo .txt se envió correctamente al canal de Discord.")
    else:
        print("Ocurrió un error al enviar el archivo .txt al canal de Discord.")

