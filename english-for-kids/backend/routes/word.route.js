const { Router } = require("express")
const Word = require("../models/word")
const Category = require("../models/category")

const router = Router()

router.get("/:id", async (req, res) => {
  try {
    const words = await Word.find({ category: req.params.id })
    return res.json(words)
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: "Все ок" })
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})
router.post("/create/:id", async (req, res) => {
  try {
    const { body } = req
    const word = await Word.create({ ...body, category: req.params.id })
    const category = await Category.findById(req.params.id)
    await category.updateOne({
      // eslint-disable-next-line no-underscore-dangle
      words: [...category.words, word._id],
    })
    return res.status(200).json(word)
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})
router.put("/update/:id", async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id, req.body)
    return res.status(200).json({ message: "Все ок" })
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})

module.exports = router
