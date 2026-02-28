const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({});

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("This is for testing the route")
})

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
