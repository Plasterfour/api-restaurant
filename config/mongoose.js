const mongoose = require("mongoose");
mongoose
  .connect("mongodb://18.144.51.87:27017/restaurant")
  .then(() => {
    console.log("connection successful.");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });
