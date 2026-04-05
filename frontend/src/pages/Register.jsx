import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // 🔥 VALIDATION

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter valid email address");
      return;
    }

    // Password length
    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    // 🔥 API CALL
    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "farmer"
        })
      });

      const data = await res.json();

      if (data.message) {
        alert("Registered successfully ✅");
        navigate("/");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🌾 Farmy Register</h2>

        <input
          placeholder="Name"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleRegister}
          onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
        >
          Register
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef5ec"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "320px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  },

  link: {
    color: "#2e7d32",
    fontWeight: "bold",
    textDecoration: "none"
  }
};

export default Register;