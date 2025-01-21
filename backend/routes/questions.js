const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Получение всех вопросов
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

// Добавление нового вопроса
router.post("/", async (req, res) => {
  const { category, title, text } = req.body;

  if (!category || !title || !text) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const newQuestion = new Question({ category, title, text });
    await newQuestion.save();
    res.status(201).json({ message: "Вопрос успешно добавлен" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при добавлении вопроса" });
  }
});

// Обновление вопроса
router.put("/:id", async (req, res) => {
  const { category, title, text } = req.body;

  if (!category || !title || !text) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { category, title, text },
      { new: true } // Опция `new: true` возвращает обновленный документ
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Вопрос не найден" });
    }

    res.json({ message: "Вопрос успешно обновлён", question: updatedQuestion });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при обновлении вопроса" });
  }
});

// Удаление вопроса
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Вопрос удалён" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

module.exports = router;
