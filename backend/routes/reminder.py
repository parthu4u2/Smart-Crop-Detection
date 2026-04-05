from fastapi import APIRouter, Depends
from routes.deps import get_current_user
from database import crops_collection, predictions_collection
from datetime import datetime

router = APIRouter()


@router.get("/smart-reminders")
def get_reminders(user=Depends(get_current_user)):
    
    reminders = []
    today = datetime.now()

    # ---------------- CROP BASED ----------------
    crops = list(crops_collection.find({"user_id": user["user_id"]}))

    for crop in crops:
        planting_date = datetime.strptime(crop["planting_date"], "%Y-%m-%d")
        days_passed = (today - planting_date).days

        if 10 <= days_passed <= 12:
            reminders.append({
                "type": "water",
                "message": f"💧 Water your {crop['crop_name']} crop"
            })

        if 20 <= days_passed <= 22:
            reminders.append({
                "type": "fertilizer",
                "message": f"🌿 Add fertilizer to {crop['crop_name']}"
            })

    # ---------------- DISEASE FOLLOW-UP ----------------
    predictions = list(predictions_collection.find({"user_id": user["user_id"]}))

    for p in predictions:
        pred_date = datetime.strptime(p["date"], "%Y-%m-%d")
        days_after = (today - pred_date).days

        if p.get("status") == "pending" and days_after >= 5:
            reminders.append({
                "type": "recheck",
                "message": f"📸 Recheck your crop for {p['disease']}"
            })

    return {
        "count": len(reminders),
        "reminders": reminders
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

 