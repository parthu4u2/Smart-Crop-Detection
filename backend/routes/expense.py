from fastapi import APIRouter, Depends
from database import expenses_collection
from models.expense_model import Expense
from routes.deps import get_current_user
from bson import ObjectId
from database import crops_collection 

router = APIRouter()

@router.post("/add-expense")
def add_expense(expense: Expense, user=Depends(get_current_user)):
    expenses_collection.insert_one({
        "user_id": user["user_id"],
        "crop_id": expense.crop_id,
        "expense_type": expense.expense_type,
        "amount": expense.amount,
        "description": expense.description
    })

    return {"message": "Expense added successfully 💰"}


 
@router.get("/expenses/{crop_id}")
def get_expenses(crop_id: str, user=Depends(get_current_user)):
    expenses = list(expenses_collection.find({
        "crop_id": crop_id,
        "user_id": user["user_id"]
    }))

    total = 0

    for exp in expenses:
        exp["_id"] = str(exp["_id"])
        total += exp["amount"]
        
    crop = crops_collection.find_one({
        "_id": ObjectId(crop_id),
        "user_id": user["user_id"]
    })

    if crop:
        total += crop.get("initial_cost", 0)

    return {
        "expenses": expenses,
        "total_expense": total
    }
