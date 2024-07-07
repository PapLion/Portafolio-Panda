import yagmail
from settings_script.config import Config, MAIL_RECEIVER

def dot_separator(text):
    """
    Esta funcion recible un argumento; text (str)
    el cual por cada punto encontrado se le agregará
    un salto de linea "\n".
    """
    modify_text = text.replace('. ', '.\n')
    if modify_text.endswith('.'):
        modify_text += '\n'
    return modify_text

def send_mail(username, email_emisor, issue, body):
    """ 
    Esta funcion recibe cuatro argumentos.
    Args: 
        email_emisor (str): Contiene el email del receptor.
        username (str): Contiene el nombre del receptor.
        issue(str): Contiene el asunto del que se va a tratar.
        body (str): Contiene el cuerpo del asunto.

    Al iniciar se les agrega "\n" al texto por cada "." encontrado mediante una funcion,
    luego se concatenan dos variables de tipo str (username, body).
    Se crea una instancia de yagmail.SMTP al cual se le agregan los datos
    del email emisor.
    Se usa la funcion .send de la instancia creada para enviar el email, se
    le agregan los argumentos a los parametros respectivos:
        to = MAIL_RECEIVER (destinatario)
        subject = issue(asunto)
        contents = user_body (cuerpo)
    """
    dots_body = dot_separator(body)
    modify_body = f"From: @{username}\nContact: {email_emisor}\n{dots_body}"

    try:
        yag = yagmail.SMTP(user=Config.MAIL_TRANSMITTER, password=Config.MAIL_PASSWORD)
        yag.send(to=MAIL_RECEIVER, subject=issue, contents=modify_body)
        print("Correo enviado exitosamente")
        return True
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        return False


