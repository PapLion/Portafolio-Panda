import json
import uuid
import json

def contacts(dict: dict):
    id=uuid.uuid4()
    nameJson = f"entity{id}.json"
    nameTxt = f"entity{id}.txt"
    with open(nameJson, 'w') as file:
        json.dump(dict, file, indent=4)

    
    with open(nameJson, 'r') as file:
        datos = json.load(file)

    with open(nameTxt, 'w') as file:
        for key, value in datos.items():
            file.write(f"{key}: {value}\n")   
    print(f"Convertion succefully!")