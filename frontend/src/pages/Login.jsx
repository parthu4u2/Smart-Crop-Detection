import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🌾 Farmy Login</h2>

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => (e.target.style.border = "1px solid #2e7d32")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => (e.target.style.border = "1px solid #2e7d32")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
          onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
        >
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Don't have account?{" "}
          <Link to="/register" style={styles.link}>
            Register
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
    outline: "none",
    transition: "0.3s"
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

export default Login;