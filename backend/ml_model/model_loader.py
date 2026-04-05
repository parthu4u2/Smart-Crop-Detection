import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Load model once
model = tf.keras.models.load_model(
    "ml_model/groundnut_disease_model.h5",
    compile=False
)

class_names = [
    "ALTERNARIA LEAF SPOT",
    "HEALTHY",
    "LEAF SPOT (EARLY AND LATE)",
    "ROSETTE",
    "RUST"
]

def predict_image(image_file):
    # Read image
    image_bytes = image_file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))

    # Preprocess
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    # Predict
    prediction = model.predict(image)
    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction)) * 100

    return predicted_class, round(confidence, 2)