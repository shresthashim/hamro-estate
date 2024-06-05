const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/userroute");
const authRouter = require("./routes/authroute");
const listingRouter = require("./routes/listingroute");
const cookieParser = require("cookie-parser");
import path from 'path';

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Error in connection in database.");
  });


const _dirname = path.resolve();


const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res) => res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
