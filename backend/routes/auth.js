const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким именем уже существует" });
    }
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    res.status(200).json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

module.exports = router;
