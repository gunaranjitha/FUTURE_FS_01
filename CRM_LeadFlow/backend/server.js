const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});