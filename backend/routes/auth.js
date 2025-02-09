const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "user",
    });
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

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    res.status(200).json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
