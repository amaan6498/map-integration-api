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
    mapMarkers: [
      {
        id: 1,
        name: "Eiffel Tower",
        type: "landmark",
        coordinates: [48.8584, 2.2945],
        description: "Iconic iron tower in Paris, France.",
        icon: "monument",
        status: "popular",
        imageUrl:
          "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlmZmVsJTIwdG93ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 2,
        name: "Shibuya Crossing",
        type: "attraction",
        coordinates: [35.6586, 139.7016],
        description: "Famous pedestrian scramble in Tokyo.",
        icon: "crossing",
        status: "busy",
        imageUrl:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpYnV5YSUyMGNyb3NzaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 3,
        name: "Grand Canyon",
        type: "natural",
        coordinates: [36.107, -112.113],
        description: "Massive canyon in Arizona, USA.",
        icon: "park",
        status: "active",
        imageUrl:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhbmQlMjBjYW55b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 4,
        name: "Sydney Opera House",
        type: "landmark",
        coordinates: [-33.8568, 151.2153],
        description: "Architectural masterpiece in Australia.",
        icon: "theater",
        status: "active",
        imageUrl:
          "https://images.unsplash.com/photo-1523428096881-5bd79d043006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwb3BlcmElMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 5,
        name: "Machu Picchu",
        type: "historical",
        coordinates: [-13.1631, -72.545],
        description: "Incan citadel in the Andes.",
        icon: "ruins",
        status: "protected",
        imageUrl:
          "https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjaHUlMjBwaWNjaHV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 6,
        name: "Times Square",
        type: "attraction",
        coordinates: [40.758, -73.9855],
        description: "Vibrant hub in New York City.",
        icon: "square",
        status: "crowded",
        imageUrl:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGltZXMlMjBzcXVhcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
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
