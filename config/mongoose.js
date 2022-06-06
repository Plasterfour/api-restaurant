const mongoose = require("mongoose");
mongoose
  //.connect("mongodb://3.101.126.115:27017/restaurant")
  .connect("mongodb://localhost:27017/restaurant")
  .then(() => {
    console.log("connection successful.");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });
