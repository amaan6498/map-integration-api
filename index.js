import express from "express";
import jwt from "jsonwebtoken";

import authenticateToken from "./middleware/auth.js";
import SampleDashboardData from "./carddata.json" assert { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, username: "Amaan", password: "Sample1" },
  { id: 2, username: "Abrar", password: "Sample2" },
];

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Login API functionality
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token });
});

//Dashboard API functionality
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.send(SampleDashboardData);
});

// Map Integration which send India as a deafult location
app.get("/api/map", authenticateToken, (req, res) => {
  const defaultLocation = {
    name: "India",
    lat: 20.5937,
    lon: 78.9629,
    bounds: [
      [8.0, 68.0], // (Kerala)
      [37.0, 97.0], // (Arunachal Pradesh)
    ],
  };

  res.json(defaultLocation);
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}.`);
});
