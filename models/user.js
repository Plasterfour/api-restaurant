const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "roles" },
    locations: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("users", schema);
module.exports = model;
