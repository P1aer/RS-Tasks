const { Router } = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/user")

const router = Router()

router.post("/login", [
  check("password", "Некоректный пароль")
    .isLength({ min: 3 }),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "В данных ошибка",
      })
    }
    const { login, password } = req.body
    const hashPassword = await bcrypt.hash(password, 12)
    const user = new User({
      login,
      password: hashPassword,
    })
    await user.save()
    const token = jwt.sign(
      { userId: user.id },
      config.get("jwtSecret"),
      { expiresIn: "1h" },
    )
    return res.json({ token, userId: user.id })
  } catch (e) {
    return res.status(500).json({ message: "Ошибка" })
  }
})
module.exports = router
