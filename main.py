from typing import Annotated
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from convert import contacts

app = FastAPI()
templates = Jinja2Templates(directory="src/templates")
app.mount("/static", StaticFiles(directory="src/static"), name="Static")
#pandi panda usa el chat de Live Share csm
@app.get("/Home", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/Home/Contact", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})


@app.post("/Home/Contact/Form")
async def contact(request:Request, name: Annotated[str, Form()], email: Annotated[str, Form()], message: Annotated[str, Form()]):
    data = {"name":name,"email":email,"message":message}
    contacts(data)
    return templates.TemplateResponse("response.html", {"request": request})

@app.get("/Home#About")
async def contact(request:Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/Home#Skills")
async def contact(request:Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/Home#Tecnologies")
async def contact(request:Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/Home#Proyects")
async def contact(request:Request):
    return templates.TemplateResponse("index.html", {"request": request})




