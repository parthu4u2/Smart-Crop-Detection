import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
    const [crops, setCrops] = useState([]);
    const [reminders, setReminders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCrops();
        fetchReminders();
    }, []);

    // ---------------- FETCH CROPS ----------------
    const fetchCrops = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://127.0.0.1:8000/my-crops", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 401) {
                alert("Session expired. Login again.");
                localStorage.removeItem("token");
                navigate("/");
                return;
            }

            const data = await res.json();
            setCrops(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            alert("Error fetching crops");
        }
    };

    // ---------------- DELETE CROP ----------------
    const deleteCrop = async (id) => {
        const token = localStorage.getItem("token");

        if (!window.confirm("Are you sure you want to delete this crop?")) return;

        await fetch(`http://127.0.0.1:8000/delete-crop/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        fetchCrops(); // refresh
    };

    // ---------------- FETCH REMINDERS ----------------
    const fetchReminders = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/smart-reminders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        // 🔥 FIX: reminders is array of strings
        setReminders(data.reminders || []);
    };

    return (
        <div>
            <h2>🌾 Dashboard</h2>

            {/* ---------------- CROPS ---------------- */}
            <div style={styles.grid}>
                {crops.map((crop) => (
                    <div
                        key={crop._id}
                        style={styles.card}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.03)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        <h3>{crop.crop_name}</h3>
                        <p>🌱 Area: {crop.land_area} acres</p>
                        <p>💰 Cost: ₹{crop.initial_cost}</p>
                        <p>📅 Date: {crop.planting_date}</p>

                        {/* ACTION BUTTONS */}
                        <div style={styles.btnContainer}>
                            <button
                                style={styles.editBtn}
                                onClick={() => navigate(`/edit-crop/${crop._id}`)}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                style={styles.deleteBtn}
                                onClick={() => deleteCrop(crop._id)}
                            >
                                🗑 Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---------------- REMINDERS ---------------- */}
            <div style={styles.reminderCard}>
                <h3>🔔 Reminders</h3>

                {reminders.length === 0 ? (
                    <p>No reminders</p>
                ) : (
                    reminders.map((r, i) => (
                        <p key={i}>👉 {r.message}</p>))
                )}
            </div>
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginTop: "20px"
    },

    card: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "0.3s"
    },

    btnContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px"
    },

    editBtn: {
        padding: "6px 10px",
        background: "#1b5e20",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },

    deleteBtn: {
        padding: "6px 10px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },

    reminderCard: {
        marginTop: "30px",
        background: "#f6f8f4",
        padding: "20px",
        borderRadius: "10px"
    }
};

export default Dashboard;