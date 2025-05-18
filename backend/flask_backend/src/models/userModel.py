from pydantic import BaseModel, EmailStr, Field
from models.portalSchema import Asset
from typing import List

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    assets: List[Asset] | None
    virtualBalance: int = Field(10000)