//  import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//       {/* 🔥 INLINE CSS FOR ANIMATION */}
//       <style>
//         {`
//           .nav-link {
//             position: relative;
//             cursor: pointer;
//             padding-bottom: 4px;
//           }

//           .nav-link::after {
//             content: "";
//             position: absolute;
//             left: 0;
//             bottom: 0;
//             width: 0%;
//             height: 2px;
//             background-color: #2e7d32;
//             transition: width 0.3s ease;
//           }

//           .nav-link:hover::after {
//             width: 100%;
//           }
//         `}
//       </style>

//       <div style={styles.navbar}>
//         <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>
//           🌾 Farmy
//         </h2>

//         <div style={styles.menu}>
//           <span className="nav-link" onClick={() => navigate("/about")}>
//             About
//           </span>

//           <span className="nav-link" onClick={() => navigate("/contact")}>
//             Contact
//           </span>

//           <span
//             className="nav-link"
//             onClick={handleLogout}
//             style={{ color: "red" }}
//           >
//             Logout
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 30px",
//     background: "#ffffff",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//   },

//   logo: {
//     cursor: "pointer"
//   },

//   menu: {
//     display: "flex",
//     gap: "25px",
//     fontWeight: "500"
//   }
// };

// export default Navbar;



import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState("");

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("token");
    navigate("/");
  };

  const getStyle = (path) => {
    const isActive = location.pathname === path;
    const isHover = hovered === path;

    return {
      position: "relative",
      cursor: "pointer",
      paddingBottom: "4px",
      color: isActive || isHover ? "#2e7d32" : "black",
      borderBottom:
        isActive || isHover ? "2px solid #2e7d32" : "2px solid transparent",
      transition: "0.3s"
    };
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>
        🌾 Farmy
      </h2>

      <div style={styles.menu}>
        <span
          style={getStyle("/about")}
          onClick={() => navigate("/about")}
          onMouseEnter={() => setHovered("/about")}
          onMouseLeave={() => setHovered("")}
        >
          About
        </span>

        <span
          style={getStyle("/contact")}
          onClick={() => navigate("/contact")}
          onMouseEnter={() => setHovered("/contact")}
          onMouseLeave={() => setHovered("")}
        >
          Contact
        </span>

        <span
          style={{
            ...getStyle("/logout"),
            color: "red"
          }}
          onClick={handleLogout}
          onMouseEnter={() => setHovered("/logout")}
          onMouseLeave={() => setHovered("")}
        >
          Logout
        </span>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    cursor: "pointer"
  },

  menu: {
    display: "flex",
    gap: "25px",
    fontWeight: "500"
  }
};

export default Navbar;