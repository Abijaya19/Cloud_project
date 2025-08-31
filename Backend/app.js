// backend/app.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Data
let customers = [
  { id: 1, name: "Abi", email: "abi@example.com" },
  { id: 2, name: "Priya", email: "priya@example.com" }
];

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];

let sales = [
  { id: 1, customerId: 1, productId: 2, quantity: 1 },
  { id: 2, customerId: 2, productId: 1, quantity: 2 }
];

// Routes
app.get("/api", (req, res) => {
  res.send("Hello, Azure! Backend is running.");
});

// GET
app.get("/api/customers", (req, res) => res.json(customers));
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/sales", (req, res) => res.json(sales));

// POST
app.post("/api/customers", (req, res) => {
  const { name, email } = req.body;
  const newCustomer = { id: customers.length + 1, name, email };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
