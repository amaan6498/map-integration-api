import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticateToken from "./middleware/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// ✅ Handle preflight requests (important for CORS)
app.options("*", cors());

const users = [
  { id: 1, username: "Amaan", password: "Sample1" },
  { id: 2, username: "Abrar", password: "Sample2" },
  { id: 3, username: "admin", password: "admin" },
  { id: 4, username: "sampleuser", password: "sampleuser" },
  { id: 5, username: "Farhan", password: "Sample3" },
  { id: 6, username: "Adil", password: "Sample4" },
];

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "f25a9d62a6bff5d5e2e8e4daebfa86327d1b214f736dc2c5c38a863ff7ef7e0b";

app.get("/", (req, res) => {
  res.send("Welcome to this API this is a simple API developed for a Project!");
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
    { expiresIn: "24h" }
  );
  res.json({ message: "Login successful", token });
});

//Dashboard API functionality
app.get("/api/dashboard", authenticateToken, (req, res) => {
  const SampleDashboardData = {
    cards: [
      {
        id: 1,
        title: "Delhi",
        value: "20,000",
        icon: "ticket",
        trend: "up",
        trendValue: 15,
        description: "Increase in users compared to last month",
      },
      {
        id: 2,
        title: "Hyderabad",
        value: "10,000",
        icon: "ticket",
        trend: "up",
        trendValue: 10,
        description: "Increase in users compared to last month",
      },
      {
        id: 3,
        title: "Mumbai",
        value: "45,000",
        icon: "ticket",
        trend: "down",
        trendValue: 5,
        description: "Decrease in users compared to last month",
      },
      {
        id: 4,
        title: "Bangalore",
        value: "40,000",
        icon: "ticket",
        trend: "up",
        trendValue: 3,
        description: "Increase in customer satisfaction compared to last month",
      },
      {
        id: 5,
        title: "Chennai",
        value: "12,000",
        icon: "ticket",
        trend: "down",
        trendValue: 8,
        description: "Decrease in users compared to last month",
      },
      {
        id: 6,
        title: "Kolkata",
        value: "12,000",
        icon: "ticket",
        trend: "up",
        trendValue: 20,
        description: "Increase in users compared to last month",
      },
    ],
  };
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
