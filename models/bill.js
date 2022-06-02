const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    date: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        amount: Number,
      },
    ],
    total: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const model = mongoose.model("bills", schema);
module.exports = model;