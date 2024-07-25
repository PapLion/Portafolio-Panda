from pydantic import BaseModel

class Form(BaseModel):
    username: str
    email: str
    issue: str
    body: str