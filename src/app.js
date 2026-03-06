require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth.router");

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", authRouter);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection is established!`);
      console.log(`The app is successfully running on ${PORT}`);
    });
  })
  .catch(() => {
    console.log(`Database can't be connected!`);
  });
