from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    password: str
    role: str   # farmer / buyer / admin
    

class LoginUser(BaseModel):
    email: str
    password: str