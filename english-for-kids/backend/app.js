const express = require("express")
const config = require("config")
const path = require("path")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true, limit: "50mb" }))

app.use("/api/auth", require("./routes/auth.route"))

app.use("/api/category", require("./routes/category.route"))

app.use("/api/word", require("./routes/word.route"))

if (process.env.NODE_ENV === "production"){
  app.use("/", express.static(path.join(__dirname, "../front", "build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../front", "build", " index.html"))
  })
}

const PORT = process.env.PORT || 80

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
