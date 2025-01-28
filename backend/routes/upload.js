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
    if (file.mimetype !== "application/json") {
      return cb(new Error("Файл должен быть в формате JSON"));
    }
    cb(null, true);
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не был загружен" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    fs.unlinkSync(filePath);

    if (!Array.isArray(fileContent)) {
      return res.status(400).json({ error: "Некорректный формат файла" });
    }

    const validQuestions = [];

    for (const item of fileContent) {
      if (item.title && item.text && item.category) {
        let category = await Category.findOne({ name: item.category });
        if (!category) {
          category = await Category.create({ name: item.category });
        }

        validQuestions.push({
          title: item.title,
          text: item.text,
          category: category.name,
        });
      }
    }

    const inserted = await Question.insertMany(validQuestions);

    res.status(200).json({
      message: "Файл успешно обработан",
      addedQuestions: inserted.length,
    });
  } catch (err) {
    console.error("Ошибка при обработке файла", err);
    res.status(500).json({ error: "Ошибка при обработке файла" });
  }
});

module.exports = router;
