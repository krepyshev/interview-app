const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

const calculateTimeToLearn = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

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

router.patch("/:id", async (req, res) => {
  const { category, title, text, difficulty, learned } = req.body;

  if (!category || !title || !text || !difficulty) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  const timeToLearn = calculateTimeToLearn(text);

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        category,
        title,
        text,
        difficulty,
        timeToLearn,
        learned: learned !== undefined ? learned : false,
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Вопрос не найден" });
    }

    res.json({ message: "Вопрос успешно обновлён", question: updatedQuestion });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при обновлении вопроса" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Вопрос удалён" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка базы данных" });
  }
});

module.exports = router;
