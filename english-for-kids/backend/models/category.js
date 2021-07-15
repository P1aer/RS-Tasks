const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  words: [{ type: Types.ObjectId, ref: "Word", default: [] }],
})
module.exports = model("Category", schema)
