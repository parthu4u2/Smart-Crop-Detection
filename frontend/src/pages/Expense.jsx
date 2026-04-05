import { useState, useEffect } from "react";

function Expense() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const res = await fetch("http://127.0.0.1:8000/my-crops", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCrops(data);
  };

  const fetchExpenses = async (cropId) => {
    const res = await fetch(`http://127.0.0.1:8000/expenses/${cropId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setExpenses(data.expenses);
    setTotal(data.total_expense);
  };

  const handleAddExpense = async () => {
    if (!selectedCrop) {
      alert("Select crop first");
      return;
    }

    await fetch("http://127.0.0.1:8000/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        crop_id: selectedCrop,
        expense_type: type,
        amount: parseFloat(amount),
        description: desc
      })
    });

    alert("Expense added 💰");
    fetchExpenses(selectedCrop);
  };

  return (
    <div>
      <h2>💰 Expense Tracking</h2>

      {/* Select Crop */}
      <select
        style={styles.select}
        onChange={(e) => {
          setSelectedCrop(e.target.value);
          fetchExpenses(e.target.value);
        }}
      >
        <option>Select Crop</option>
        {crops.map((c) => (
          <option key={c._id} value={c._id}>
            {c.crop_name}
          </option>
        ))}
      </select>

      {/* Add Expense */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Type (fertilizer/labor)"
          onChange={(e) => setType(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleAddExpense}
          onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
        >
          Add Expense
        </button>
      </div>

      {/* 🔥 Highlighted Total */}
      <h3 style={styles.total}>Total Expense: ₹{total}</h3>

      {/* Show Expenses */}
      {expenses.map((e) => (
        <div
          key={e._id}
          style={styles.card}
          onMouseOver={(ev) =>
            (ev.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseOut={(ev) =>
            (ev.currentTarget.style.transform = "scale(1)")
          }
        >
          <p>
            <strong>{e.expense_type}</strong> - ₹{e.amount}
          </p>
          <small>{e.description}</small>
        </div>
      ))}
    </div>
  );
}

const styles = {
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "10px"
  },

  form: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    padding: "8px",
    borderRadius: "5px",
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

  total: {
    marginTop: "20px",
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: "18px"
  },

  card: {
    background: "#ffffff",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    transition: "0.3s"
  }
};

export default Expense;