import { useEffect, useState } from "react";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/smart-reminders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ SAFE HANDLING (array or fallback)
      if (Array.isArray(data)) {
        setReminders(data);
      } else if (Array.isArray(data.reminders)) {
        setReminders(data.reminders);
      } else {
        setReminders([]);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setReminders([]);
    }
  };

  return (
    <div>
      <h2>🔔 Smart Reminders</h2>

      {reminders.length === 0 ? (
        <p>No reminders right now ✅</p>
      ) : (
        reminders.map((r, index) => (
          <div key={index} style={styles.card}>
            👉 {typeof r === "string" ? r : r.message}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#f6f8f4",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default Reminders;