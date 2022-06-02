const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "roles" },
    locations: [{ direction: String, latitude: Decimal128, longitude: Decimal128 }],
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("users", schema);
module.exports = model;
