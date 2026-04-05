from fastapi import FastAPI
from routes.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}

from routes.deps import get_current_user
from fastapi import Depends

@app.get("/protected")
def protected(user=Depends(get_current_user)):
    return {
        "message": "You are authorized ✅",
        "user": user
    }
    

from routes.crop import router as crop_router

app.include_router(crop_router)


from routes.expense import router as expense_router

app.include_router(expense_router)



from routes.prediction import router as prediction_router

app.include_router(prediction_router)


from routes.reminder import router as reminder_router

app.include_router(reminder_router)


from routes.product import router as product_router

app.include_router(product_router)

from routes.marketplace import router as marketplace_router
app.include_router(marketplace_router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # IMPORTANT
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from routes.chatbot import router as chatbot_router

app.include_router(chatbot_router)