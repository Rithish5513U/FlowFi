from pydantic import BaseModel, EmailStr, Field
from models.userModel import User
from typing import List

class Asset(BaseModel):
    name: str
    type: str
    price: int
    quantity: int
    owner: User
    
class User(BaseModel):
    name: str
    email: EmailStr
    virtualBalance: int = Field(10000)
    assets: List[Asset]
    
    