import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cropName, setCropName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 Fetch existing product
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();

    const product = data.find((p) => p._id === id);

    if (product) {
      setCropName(product.crop_name);
      setPrice(product.price);
      setQuantity(product.quantity);
      setLocation(product.location);
    }
  };

  // 🔥 Update product
  const handleUpdate = async () => {
    if (!cropName || !price || !quantity || !location) {
      alert("All fields required");
      return;
    }

    await fetch(`http://127.0.0.1:8000/update-product/${id}`, {
      method: "PUT",
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

    alert("Product updated ✅");
    navigate("/marketplace");
  };

  return (
    <div style={styles.container}>
      <h2>✏️ Edit Product</h2>

      <input
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
        placeholder="Crop Name"
        style={styles.input}
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        style={styles.input}
      />

      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        style={styles.input}
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        style={styles.input}
      />

      <button
        style={styles.button}
        onClick={handleUpdate}
        onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
        onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
      >
        Update Product
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

export default EditProduct;