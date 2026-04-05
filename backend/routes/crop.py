from fastapi import APIRouter, Depends
from database import crops_collection
from models.crop_model import Crop
from routes.deps import get_current_user

router = APIRouter()

@router.post("/add-crop")
def add_crop(crop: Crop, user=Depends(get_current_user)):
    crops_collection.insert_one({
        "user_id": user["user_id"],
        "crop_name": crop.crop_name,
        "planting_date": crop.planting_date,
        "land_area": crop.land_area,
        "initial_cost": crop.initial_cost
    })

    return {"message": "Crop added successfully 🌾"}




@router.get("/my-crops")
def get_my_crops(user=Depends(get_current_user)):
    crops = list(crops_collection.find({"user_id": user["user_id"]}))

    # Convert ObjectId to string .
    for crop in crops:
        crop["_id"] = str(crop["_id"])

    return crops


from bson import ObjectId
from fastapi import HTTPException

@router.delete("/delete-crop/{crop_id}")
def delete_crop(crop_id: str, user=Depends(get_current_user)):

    result = crops_collection.delete_one({
        "_id": ObjectId(crop_id),
        "user_id": user["user_id"]
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Crop not found")

    return {"message": "Crop deleted successfully"}

from models.crop_model import Crop

@router.put("/update-crop/{crop_id}")
def update_crop(crop_id: str, crop: Crop, user=Depends(get_current_user)):

    result = crops_collection.update_one(
        {
            "_id": ObjectId(crop_id),
            "user_id": user["user_id"]
        },
        {
            "$set": {
                "crop_name": crop.crop_name,
                "planting_date": crop.planting_date,
                "land_area": crop.land_area,
                "initial_cost": crop.initial_cost
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Crop not found")

    return {"message": "Crop updated successfully"}