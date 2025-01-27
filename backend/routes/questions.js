// backend/routes/questions.js
const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Функция для расчёта времени на изучение
const calculateTimeToLearn = (text) => {
  const wordsPerMinute = 200; // Средняя скорость чтения (слов в минуту)
  const wordCount = text.trim().split(/\s+/).length; // Подсчёт слов в тексте
  return Math.ceil(wordCount / wordsPerMinute); // Округляем вверх, чтобы получить минуты
};

// Получение всех вопросов
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

// Получение вопроса по ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Вопрос не найден" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении вопроса" });
  }
});

// Добавление нового вопроса
router.post("/", async (req, res) => {
  const { category, title, text, difficulty } = req.body;

  if (!category || !title || !text || !difficulty) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  const timeToLearn = calculateTimeToLearn(text);

  try {
    const newQuestion = new Question({
      category,
      title,
      text,
      difficulty,
      timeToLearn,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Вопрос успешно добавлен" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при добавлении вопроса" });
  }
});

// Обновление вопроса
router.put("/:id", async (req, res) => {
  const { learned } = req.body;

  // Проверяем, если нет поля learned
  if (typeof learned === "undefined") {
    return res.status(400).json({ error: "Поле 'learned' обязательно" });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { learned }, // Обновляем только поле 'learned'
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Вопрос не найден" });
    }

    res.json({
      message: "Статус выученного обновлён",
      question: updatedQuestion,
    });
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
