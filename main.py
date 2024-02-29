from typing import Annotated
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from convert import contacts

app = FastAPI()
templates = Jinja2Templates(directory="src")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})

@app.post("/contact/form")
async def contact(request:Request, name: Annotated[str, Form()], email: Annotated[str, Form()], message: Annotated[str, Form()]):
    data = {"name":name,"email":email,"message":message}
    contacts(data)
    return templates.TemplateResponse("response.html", {"request": request})

