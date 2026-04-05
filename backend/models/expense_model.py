from pydantic import BaseModel

class Expense(BaseModel):
    crop_id: str
    expense_type: str   # fertilizer / labor / pesticide
    amount: float
    description: str