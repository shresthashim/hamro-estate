const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Error in connection in database.");
  });

const app = express();

app.listen(3000, () => {
  console.log("Sever is running in port 3000");
});
