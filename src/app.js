const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 3000;

app.get("/Hello", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  console.log("Database Connection is established!");
  app.listen(PORT, () => {
    console.log(`The App is successfully running on PORT ${PORT}`);
  });
}).catch(() => {
  console.log("Database Can't be connected!");
})
