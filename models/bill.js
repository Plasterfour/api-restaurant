const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    date: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    products: [
      [
        {
          id: { type: Schema.Types.ObjectId, ref: "products" },
          amount: Number,
        },
      ],
    ],
    total: Number,
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("bills", schema);
module.exports = model;
