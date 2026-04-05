from pydantic import BaseModel

class Crop(BaseModel):
    crop_name: str
    planting_date: str
    land_area: float
    initial_cost: float