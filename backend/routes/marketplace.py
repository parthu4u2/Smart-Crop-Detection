from fastapi import APIRouter, Depends, HTTPException
from database import products_collection
from routes.deps import get_current_user
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter()


# ---------------- PRODUCT UPDATE MODEL ----------------
class ProductUpdate(BaseModel):
    crop_name: str
    price: float
    quantity: float
    location: str


# ---------------- DELETE PRODUCT ----------------
@router.delete("/delete-product/{product_id}")
def delete_product(product_id: str, user=Depends(get_current_user)):

    result = products_collection.delete_one({
        "_id": ObjectId(product_id),
        "user_id": user["user_id"]   # ✅ SAME AS CROP
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}


# ---------------- UPDATE PRODUCT ----------------
@router.put("/update-product/{product_id}")
def update_product(product_id: str, product: ProductUpdate, user=Depends(get_current_user)):

    result = products_collection.update_one(
        {
            "_id": ObjectId(product_id),
            "user_id": user["user_id"]   # ✅ SAME AS CROP
        },
        {
            "$set": {
                "crop_name": product.crop_name,
                "price": product.price,
                "quantity": product.quantity,
                "location": product.location
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product updated successfully"}