from fastapi import APIRouter, HTTPException, status
from models import Form
from settings_script.send_email import send_mail
from fastapi.responses import HTMLResponse, JSONResponse
from pathlib import Path

router = APIRouter()

@router.get("/contactme", response_class=HTMLResponse)
async def contact_path():
    index_path = Path("static/html/contact.html")
    return index_path.read_text()

@router.post("/send_contact")
async def send_message(data: Form):
    """
    Esta funcion crea un objeto de la clase form, para
    posteriormente enviar la informacion a "send_mail" y ejecutar
    el envio del email respectivamente.

    Si hubo un error se levanta el estado http 500.
    Si no hubo ningun error se levanta el estado http 200.
    """
    try:
        response = send_mail(username=data.username,
                            email_emisor=data.email, 
                            issue=data.issue,
                            body=data.body)
        if not response:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Parece que hubo un problema..."
            )
        
        sms = "Se envió el formulario con éxito."
        return JSONResponse(content=sms, status_code=status.HTTP_200_OK)
    
    except Exception as e:
        print(f"error: {e}")

@router.get("/", response_class=HTMLResponse)
async def root_templates():
    index_path = Path("static/html/index.html")
    return index_path.read_text()

