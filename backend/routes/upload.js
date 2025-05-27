const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Question = require("../models/Question");
const Category = require("../models/Category");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".md")) {
      return cb(new Error("Файл должен быть в формате Markdown (.md)"));
    }

    cb(null, true);
  },
});

const calculateTimeToLearn = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.error("❌ Ошибка: Файл не был загружен");
      return res.status(400).json({ error: "Файл не был загружен" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    fs.unlinkSync(filePath);

    const questions = [];
    let currentCategory = "";
    let currentDifficulty = "easy";
    let currentQuestion = null;
    let inCodeBlock = false;
    let codeBlockContent = "";

    fileContent.split("\n").forEach((line) => {
      const categoryMatch = line.match(/^## Категория: (.+)$/);
      const questionTitleMatch = line.match(/^### (.+)$/);
      const difficultyMatch = line.match(/^### Сложность: (easy|medium|hard)$/);
      const codeBlockStartMatch = line.match(/^```(\w+)?$/);
      const codeBlockEndMatch = line.match(/^```$/);

      if (categoryMatch) {
        currentCategory = categoryMatch[1].trim();
      } else if (difficultyMatch) {
        currentDifficulty = difficultyMatch[1].trim();
      } else if (questionTitleMatch && currentCategory) {
        if (currentQuestion) {
          if (!currentQuestion.text.trim()) {
            currentQuestion.text = currentQuestion.title;
          }
          questions.push(currentQuestion);
        }

        currentQuestion = {
          category: currentCategory,
          title: questionTitleMatch[1].trim(),
          text: "",
          difficulty: currentDifficulty,
        };
      } else if (codeBlockStartMatch) {
        inCodeBlock = true;
        codeBlockContent = `\`\`\`${codeBlockStartMatch[1] || ""}\n`;
      } else if (codeBlockEndMatch && inCodeBlock) {
        inCodeBlock = false;
        codeBlockContent += "```\n";
        if (currentQuestion) {
          currentQuestion.text += codeBlockContent;
        }
      } else if (currentQuestion) {
        if (inCodeBlock) {
          codeBlockContent += line + "\n";
        } else {
          currentQuestion.text += line + "\n";
        }
      }
    });

    if (currentQuestion) {
      if (!currentQuestion.text.trim()) {
        currentQuestion.text = currentQuestion.title;
      }
      questions.push(currentQuestion);
    }

    if (!questions.length) {
      console.error("❌ Ошибка: Файл не содержит вопросов");
      return res.status(400).json({ error: "Файл не содержит вопросов" });
    }

    const validQuestions = [];
    for (const item of questions) {
      let category = await Category.findOne({ name: item.category });
      if (!category) {
        category = await Category.create({ name: item.category });
      }

      validQuestions.push({
        title: item.title,
        text: item.text.trim(),
        category: category.name,
        difficulty: item.difficulty || "medium",
        timeToLearn: calculateTimeToLearn(item.text),
      });
    }

    const inserted = await Question.insertMany(validQuestions);

    res.status(200).json({
      message: "Файл успешно обработан",
      addedQuestions: inserted.length,
    });
  } catch (err) {
    console.error("❌ Ошибка при обработке файла:", err);
    res.status(500).json({ error: "Ошибка при обработке файла" });
  }
});

module.exports = router;
