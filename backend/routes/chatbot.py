from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    disease: str = None

@router.post("/chat")
async def chat(req: ChatRequest):
    msg = req.message.lower()
    disease = req.disease.lower() if req.disease else ""

    # ✅ PRIORITY: disease-based response
    if "rust" in disease:
        reply = "Rust is a fungal disease. Use fungicides like Propiconazole and remove infected leaves."

    elif "leaf spot" in disease:
        reply = "Leaf spot disease spreads due to fungi or bacteria. Use copper fungicide and remove infected parts."

    elif "healthy" in disease:
        reply = "Your crop is healthy. Maintain proper irrigation and sunlight."

    # ✅ QUESTION-based logic
    elif "what should i do" in msg or "treatment" in msg:
        reply = f"For {disease.upper()}, you should use recommended pesticides and monitor plant health regularly."

    elif "fertilizer" in msg:
        reply = "Use nitrogen-rich fertilizers during early growth and balanced NPK later."

    else:
        reply = f"I understand your crop has {disease.upper()}. Please follow proper pesticide use and farming practices."

    return {"reply": reply}