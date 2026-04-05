import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [cropName, setCropName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ ADD

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!cropName || !price || !quantity || !location) {
      alert("All fields required");
      return;
    }

    await fetch("http://127.0.0.1:8000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        crop_name: cropName,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        location: location
      })
    });

    alert("Product added 🌾");
    fetchProducts();
  };

  // 🗑 DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`http://127.0.0.1:8000/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  return (
    <div>
      <h2>🛒 Marketplace</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Crop Name"
          onChange={(e) => setCropName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleAddProduct}
          onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
        >
          Sell Crop
        </button>
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {products.map((p) => (
          <div
            key={p._id}
            style={styles.card}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3>{p.crop_name}</h3>
            <p style={styles.price}>₹{p.price}</p>
            <p>📦 Qty: {p.quantity}</p>
            <p>📍 {p.location}</p>

            {/* ACTION BUTTONS */}
            <div style={styles.btnContainer}>
              {/* ✅ EDIT CONNECTED */}
              <button
                style={styles.editBtn}
                onClick={() => navigate(`/edit-product/${p._id}`)}
                onMouseOver={(e) =>
                  (e.target.style.background = "#2e7d32")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "#1b5e20")
                }
              >
                ✏️ Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(p._id)}
                onMouseOver={(e) =>
                  (e.target.style.background = "#b71c1c")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "red")
                }
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "8px 15px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px"
  },

  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2e7d32"
  },

  btnContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  editBtn: {
    padding: "5px 10px",
    background: "#1b5e20",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  deleteBtn: {
    padding: "5px 10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Marketplace;