const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Получить список всех категорий
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения категорий" });
  }
});

// Добавить новую категорию
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Имя категории обязательно" });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Категория успешно добавлена" });
  } catch (err) {
    res.status(400).json({ error: "Не удалось добавить категорию" });
  }
});

// Удалить категорию по ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: "Категория успешно удалена" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при удалении категории" });
  }
});

module.exports = router;
