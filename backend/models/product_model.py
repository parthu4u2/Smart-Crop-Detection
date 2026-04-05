from pydantic import BaseModel

class Product(BaseModel):
    crop_name: str
    price: float
    quantity: float
    location: str