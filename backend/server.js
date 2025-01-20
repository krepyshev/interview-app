const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const categoryRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect("mongodb://mongo:27017/interviewApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Маршруты
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/categories", categoryRoutes);
app.use("/upload", uploadRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
