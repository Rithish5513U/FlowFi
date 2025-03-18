from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import List, Optional

class TransactionItem(BaseModel):
    balance: str
    date: date
    deposits: Optional[str] = Field("0.00")
    description: str
    withdrawals: Optional[str] = Field("0.00")
    
class Transaction:
    userEmail: EmailStr
    transactions: List[TransactionItem]