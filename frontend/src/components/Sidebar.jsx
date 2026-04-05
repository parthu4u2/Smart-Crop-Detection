import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "🏠 Home", path: "/dashboard" },
    { label: "➕ Add Crop", path: "/add-crop" },
    { label: "🤖 Detection", path: "/detection" },
    { label: "📊 History", path: "/history" },
    { label: "💰 Expense", path: "/expense" },
    { label: "🛒 Marketplace", path: "/marketplace" },
    { label: "🔔 Reminders", path: "/reminders" },
    { label: "🚜 Harvest", path: "/harvest" }
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={{ marginBottom: "20px" }}>🌱 Farmy Panel</h3>

      <div style={styles.menu}>
        {menuItems.map((item, index) => (
          <p
            key={index}
            style={styles.item}
            onClick={() => navigate(item.path)}
            onMouseOver={(e) => (e.target.style.background = "#2e7d32")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "230px",
    padding: "20px",
    background: "#1b5e20",
    color: "white",
    height: "100vh"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  item: {
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default Sidebar;