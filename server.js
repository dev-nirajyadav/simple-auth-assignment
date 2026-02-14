const express = require("express");
const cors = require("cors");

const PORT = 5000;

const TEST_USER = {
  email: "test@test.com",
  password: "123456",
};

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

let validToken = null;

// middleware
const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== validToken) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email == TEST_USER.email && password == TEST_USER.password) {
    validToken = Math.random().toString(36).substring(2);
    return res.json({ success: true, token: validToken });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Proteced Route
app.get("/dashboard", authMiddleWare, (req, res) => {
    // for data query - we can add a logic here
    // but as per requirement we need to show a message only
    return res.json({success: true, message: "User can access the dashboard",});
});

app.listen(5000, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
