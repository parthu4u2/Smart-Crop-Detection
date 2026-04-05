from fastapi import APIRouter, Depends
from database import products_collection
from models.product_model import Product
from routes.deps import get_current_user

router = APIRouter()

# ---------------- ADD PRODUCT ----------------
@router.post("/add-product")
def add_product(product: Product, user=Depends(get_current_user)):
    
    products_collection.insert_one({
        "user_id": user["user_id"],
        "crop_name": product.crop_name,
        "price": product.price,
        "quantity": product.quantity,
        "location": product.location
    })

    return {"message": "Product listed successfully 🌾"}

# ---------------- GET PRODUCTS ----------------
@router.get("/products")
def get_products():
    products = list(products_collection.find())

    for p in products:
        p["_id"] = str(p["_id"])

    return products