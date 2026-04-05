import { useEffect, useState } from "react";

function History() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await fetch("http://127.0.0.1:8000/prediction-history", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await res.json();
    setData(result);
  };

  const updateStatus = async (id, status) => {
    await fetch(
      `http://127.0.0.1:8000/update-disease-status/${id}?status=${status}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchHistory();
  };

  return (
    <div>
      <h2>📊 Disease History</h2>

      {data.map((item) => (
        <div
          key={item._id}
          style={styles.card}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h3>{item.disease}</h3>
          <p>Confidence: {item.confidence}%</p>

          {/* 🔥 STATUS HIGHLIGHT */}
          <p style={{
            ...styles.status,
            color:
              item.status === "cured"
                ? "#2e7d32"
                : item.status === "not cured"
                  ? "red"
                  : "#ff9800"
          }}>
            Status: {item.status || "pending"}
          </p>

          <div style={styles.btnContainer}>
            <button
              style={styles.greenBtn}
              onClick={() => updateStatus(item._id, "cured")}
              onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
              onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
            >
              ✔ Mark Cured
            </button>

            <button
              style={styles.redBtn}
              onClick={() => updateStatus(item._id, "not cured")}
              onMouseOver={(e) => (e.target.style.background = "#b71c1c")}
              onMouseOut={(e) => (e.target.style.background = "#e53935")}
            >
              ✖ Not Cured
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  status: {
    fontWeight: "bold",
    marginTop: "5px"
  },

  btnContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  greenBtn: {
    padding: "6px 12px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  },

  redBtn: {
    padding: "6px 12px",
    background: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default History;