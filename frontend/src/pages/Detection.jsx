import Chatbot from "../components/Chatbot";
import { useState } from "react";

function Detection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // ✅ Pesticide Mapping WITH LINK
  const pesticideSuggestions = {
    "ALTERNARIA LEAF SPOT": [
      "Chlorothalonil: 2g/L spray every 7 days",
      "Mancozeb: 2.5g/L ensure proper coverage",
      "LINK:https://www.amazon.in/s?k=alternaria+leaf+spot+fungicide"
    ],

    "HEALTHY": [
      "No pesticide needed",
      "Maintain proper irrigation and sunlight",
      "LINK:#"
    ],

    "LEAF SPOT (EARLY AND LATE)": [
      "Copper Fungicide: 2g/L weekly spray",
      "Remove infected leaves",
      "LINK:https://www.amazon.in/s?k=leaf+spot+fungicide"
    ],

    "ROSETTE": [
      "Apply Boron fertilizer",
      "Improve soil nutrition",
      "LINK:https://www.amazon.in/s?k=boron+fertilizer"
    ],

    "RUST": [
      "Propiconazole: 25 EC @ 2ml/L (15-day interval)",
      "Mancozeb: 75 WP @ 2.5g/L",
      "Tebuconazole: 250 EC @ 1ml/L",
      "LINK:https://www.amazon.in/s?k=rust+fungicide"
    ]
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/predict-disease", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    setResult(data);
  };

  // ✅ Get pesticides
  const pesticides = result
    ? pesticideSuggestions[result.disease]
    : [];

  // ✅ Extract link
  const linkItem = pesticides?.find(item => item.startsWith("LINK:"));
  const buyLink = linkItem ? linkItem.replace("LINK:", "") : null;

  return (
    <div style={styles.container}>
      <h2>🤖 Disease Detection</h2>

      {/* Upload */}
      <div style={styles.uploadBox}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img src={preview} alt="preview" style={styles.image} />
        )}

        <button
          style={styles.button}
          onClick={handleUpload}
          onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
        >
          🔍 Predict Disease
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <>
          <div style={styles.resultContainer}>

            {/* RESULT CARD */}
            <div style={styles.resultCard}>
              <h3>🌿 {result.disease}</h3>
              <p style={styles.confidence}>
                Confidence: {result.confidence}%
              </p>
            </div>

            {/* PESTICIDE */}
            {pesticides && (
              <div style={styles.pesticideCard}>
                <h4>🧪 Pesticide Suggestions</h4>

                <ul>
                  {pesticides
                    .filter(item => !item.startsWith("LINK:"))
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>

                {buyLink && buyLink !== "#" && (
                  <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.buyLink}
                  >
                    🛒 Buy Pesticides Online
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 🤖 CHATBOT ADDED HERE */}
          <Chatbot disease={result.disease} />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px"
  },

  uploadBox: {
    marginTop: "20px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "inline-block"
  },

  image: {
    marginTop: "15px",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  resultContainer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  resultCard: {
    padding: "20px",
    background: "#f1f8e9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  pesticideCard: {
    padding: "20px",
    background: "#e8f5e9",
    borderRadius: "10px",
    width: "280px",
    textAlign: "left",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  buyLink: {
    display: "inline-block",
    marginTop: "10px",
    color: "#1b5e20",
    fontWeight: "bold",
    textDecoration: "none"
  },

  confidence: {
    fontWeight: "bold",
    color: "#2e7d32"
  }
};

export default Detection;