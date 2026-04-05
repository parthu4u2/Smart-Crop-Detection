from fastapi import APIRouter, UploadFile, File, Depends
from ml_model.model_loader import predict_image
from routes.auth import get_current_user
from database import predictions_collection
from datetime import datetime

router = APIRouter()

# Treatment data (copied from your old code)
treatment_data = {
    "ALTERNARIA LEAF SPOT": {
        "solution": "Spray Mancozeb or Chlorothalonil every 10 days.",
        "products": [{"name": "Mancozeb Fungicide", "link": "https://www.amazon.in/"}]
    },
    "RUST": {
        "solution": "Use Hexaconazole or Propiconazole spray.",
        "products": [{"name": "Hexaconazole Fungicide", "link": "https://www.amazon.in/"}]
    },
    "ROSETTE": {
        "solution": "Control aphids using systemic insecticides.",
        "products": [{"name": "Imidacloprid Insecticide", "link": "https://www.amazon.in/"}]
    },
    "LEAF SPOT (EARLY AND LATE)": {
        "solution": "Apply Carbendazim or Mancozeb spray.",
        "products": [{"name": "Carbendazim Fungicide", "link": "https://www.flipkart.com/"}]
    },
    "HEALTHY": {
        "solution": "No disease detected. Maintain proper fertilization.",
        "products": []
    }
}

@router.post("/predict-disease")
async def predict_disease(
    file: UploadFile = File(...),
    user=Depends(get_current_user)
):
    predicted_disease, confidence = predict_image(file.file)

    treatment = treatment_data.get(predicted_disease, {})

    # Save in DB
    predictions_collection.insert_one({
        "user_id": user["user_id"],
        "disease": predicted_disease,
        "confidence": confidence,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "status": "pending"   # 🆕 add this
    })

    return {
        "disease": predicted_disease,
        "confidence": confidence,
        "solution": treatment.get("solution"),
        "products": treatment.get("products")
    }
    
    
    
@router.get("/prediction-history")
def get_prediction_history(user=Depends(get_current_user)):
    predictions = list(predictions_collection.find({
        "user_id": user["user_id"]
    }))

    for p in predictions:
        p["_id"] = str(p["_id"])

    return predictions



from fastapi import HTTPException
from bson import ObjectId

@router.put("/update-disease-status/{prediction_id}")
def update_status(prediction_id: str, status: str, user=Depends(get_current_user)):
    
    result = predictions_collection.update_one(
        {
            "_id": ObjectId(prediction_id),
            "user_id": user["user_id"]
        },
        {
            "$set": {"status": status}
        }
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return {"message": "Status updated successfully"}