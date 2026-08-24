require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

console.log("Connecting to MongoDB...");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.error(err);
  });

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB CRUD API is Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});