import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AddCrop from "./pages/AddCrop";
import Expense from "./pages/Expense";
import Detection from "./pages/Detection";
import History from "./pages/History";
import Marketplace from "./pages/Marketplace";
import Reminders from "./pages/Reminders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Harvest from "./pages/Harvest";
import EditCrop from "./pages/EditCrop";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/add-crop"
        element={
          <Layout>
            <AddCrop />
          </Layout>
        }
      />

      <Route
        path="/expense"
        element={
          <Layout>
            <Expense />
          </Layout>
        }
      />

      <Route
        path="/detection"
        element={
          <Layout>
            <Detection />
          </Layout>
        }
      />

      <Route
        path="/history"
        element={
          <Layout>
            <History />
          </Layout>
        }
      />

      <Route
        path="/marketplace"
        element={
          <Layout>
            <Marketplace />
          </Layout>
        }
      />

      <Route
        path="/reminders"
        element={
          <Layout>
            <Reminders />
          </Layout>
        }
      />

      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />

      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/harvest"
        element={
          <Layout>
            <Harvest />
          </Layout>
        }
      />

      <Route
        path="/edit-crop/:id"
        element={
          <Layout>
            <EditCrop />
          </Layout>
        }
      />



      <Route
        path="/edit-product/:id"
        element={
          <Layout>
            <EditProduct />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;