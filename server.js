const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bp = require("body-parser");
var mongoose = require("mongoose");
const cor = require("cors");

app.use(bp.json());
// process.env.DB_URL||||'mongodb://localhost:27017/test'
//mlab=buyforestgmail

const URL =
  "mongodb+srv://kibria:kibria7533@cluster0.x2wql.mongodb.net/mybussiness?retryWrites=true&w=majority";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("database connected");
});

app.use(cor());
app.use("/api/product", require("./routes/product"));
app.use(require("./routes/menus"));
app.use("/api/users", require("./routes/users"));
app.use(require("./routes/googleuser"));
app.use(require("./routes/facebookuser"));
app.use(require("./routes/orders"));
app.use(require("./routes/comments&reviewroute"));
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("server started at ");
});
