const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  category: { type: Types.ObjectId, ref: "Category", required: true },
  word: { type: String, required: true },
  translate: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
})
module.exports = model("Word", schema)
