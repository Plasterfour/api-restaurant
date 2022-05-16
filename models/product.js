const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("products", schema);
module.exports = model;
