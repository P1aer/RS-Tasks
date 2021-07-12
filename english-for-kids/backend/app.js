const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.route"))

app.use("/api/category", require("./routes/category.route"))

app.use("/api/word", require("./routes/word.route"))

const PORT = config.get("port") || 5000

async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`App  ${PORT}`))
  } catch (e) {
    process.exit(1)
  }
}
start()
