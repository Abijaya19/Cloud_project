// frontend/src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const backendURL = "http://localhost:5000/api"; // Replace with VM IP later

  // Fetch Data
  useEffect(() => {
    axios.get(`${backendURL}/customers`).then(res => setCustomers(res.data));
    axios.get(`${backendURL}/products`).then(res => setProducts(res.data));
    axios.get(`${backendURL}/sales`).then(res => setSales(res.data));
  }, []);

  // Add Customer
  const addCustomer = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${backendURL}/customers`, newCustomer);
    setCustomers([...customers, res.data]);
    setNewCustomer({ name: "", email: "" });
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${backendURL}/products`, {
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
    setProducts([...products, res.data]);
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f9;
          margin: 0;
          padding: 0;
        }
        header {
          background: #0078D7;
          color: white;
          padding: 15px;
          text-align: center;
        }
        section {
          padding: 20px;
        }
        h2 {
          border-bottom: 2px solid #0078D7;
          padding-bottom: 5px;
          margin-bottom: 10px;
          color: #333;
        }
        .card {
          background: white;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        form {
          margin: 15px 0;
          padding: 10px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        input {
          margin: 5px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background: #0078D7;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #005fa3;
        }
      `}</style>

      <header>
        <h1>Retail App - Azure Deployment</h1>
      </header>

      <section>
        <h2>Customers</h2>
        <form onSubmit={addCustomer}>
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            required
          />
          <button type="submit">Add Customer</button>
        </form>
        {customers.map(c => (
          <div className="card" key={c.id}>
            <strong>{c.name}</strong> <br />
            {c.email}
          </div>
        ))}
      </section>

      <section>
        <h2>Products</h2>
        <form onSubmit={addProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <button type="submit">Add Product</button>
        </form>
        {products.map(p => (
          <div className="card" key={p.id}>
            <strong>{p.name}</strong> <br />
            Price: ₹{p.price}
          </div>
        ))}
      </section>

      <section>
        <h2>Sales</h2>
        {sales.map(s => (
          <div className="card" key={s.id}>
            Customer {s.customerId} bought Product {s.productId} (x{s.quantity})
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
