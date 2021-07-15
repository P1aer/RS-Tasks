const { Router } = require("express")
const Word = require("../models/word")
const Category = require("../models/category")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const obj = {}
    const words = await Word.find()
    words.forEach((elem) => {
      // eslint-disable-next-line no-unused-expressions
      obj?.[elem.category] ? obj[elem.category].push(elem)
        : obj[elem.category] = [elem]
    })
    return res.json(obj)
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})

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
    const word = await Word.findById(req.params.id)
    const category = await Category.findOne({ name: word.category })
    const newArr = [...category.words]
    newArr.pop()
    await category.update({
      words: newArr,
    })
    await word.delete()
    return res.status(200).json({ message: "Все ок" })
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})
router.post("/create/:id", async (req, res) => {
  try {
    const { body } = req
    const category = await Category.findOne({ name: req.params.id })
    const word = await Word.create({ ...body, category: req.params.id })
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
    await Word.findByIdAndUpdate(req.params.id, req.body)
    const result = await Word.findById(req.params.id)
    return res.status(200).json({ result })
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})

module.exports = router
