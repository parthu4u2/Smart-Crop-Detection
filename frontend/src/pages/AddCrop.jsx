import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCrop() {
  const navigate = useNavigate();

  const [cropName, setCropName] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [cost, setCost] = useState("");

  const handleAddCrop = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/add-crop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        crop_name: cropName,
        planting_date: date,
        land_area: parseFloat(area),
        initial_cost: parseFloat(cost)
      })
    });

    const data = await res.json();

    if (data.message) {
      alert("Crop added successfully 🌾");
      navigate("/dashboard");
    } else {
      alert("Error adding crop");
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add Crop</h2>

      <input
        placeholder="Crop Name"
        style={styles.input}
        onChange={(e) => setCropName(e.target.value)}
      />

      <input
        type="date"
        style={styles.input}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        placeholder="Land Area (acres)"
        style={styles.input}
        onChange={(e) => setArea(e.target.value)}
      />

      <input
        placeholder="Initial Cost"
        style={styles.input}
        onChange={(e) => setCost(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={handleAddCrop}
        onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
        onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
      >
        Add Crop
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default AddCrop;