import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCrop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cropName, setCropName] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [cost, setCost] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCrop();
  }, []);

  const fetchCrop = async () => {
    const res = await fetch("http://127.0.0.1:8000/my-crops", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    const crop = data.find((c) => c._id === id);

    if (crop) {
      setCropName(crop.crop_name);
      setDate(crop.planting_date);
      setArea(crop.land_area);
      setCost(crop.initial_cost);
    }
  };

  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:8000/update-crop/${id}`, {
      method: "PUT",
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

    alert("Crop updated ✅");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>✏️ Edit Crop</h2>

      <input
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
        placeholder="Crop Name"
        style={styles.input}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />

      <input
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Land Area"
        style={styles.input}
      />

      <input
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Initial Cost"
        style={styles.input}
      />

      <button
        style={styles.button}
        onClick={handleUpdate}
        onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
        onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
      >
        Update Crop
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

export default EditCrop;