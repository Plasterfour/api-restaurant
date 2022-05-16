const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("roles", schema);
module.exports = model;
