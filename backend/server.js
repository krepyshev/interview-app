const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect("mongodb://mongo:27017/interviewApp", {
    // Важно указать 'mongo', если это имя сервиса в docker-compose
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Схема и модель пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

// Регистрация пользователя
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Пользователь с таким именем уже существует" });
  }
});

// Авторизация пользователя
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login request received:", { username, password });

  if (!username || !password) {
    console.log("Missing fields in request");
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const user = await User.findOne({ username, password });
    console.log("User found in database:", user);

    if (!user) {
      console.log("Invalid credentials");
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    res.status(200).json({ username: user.username, role: user.role });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
