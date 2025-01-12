const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("642811cdaa73d64dd9937a98").then((user) => {
//     req.user = new User(user.name, user.email, user.cart, user._id);
//     next();
//   });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://akashpuranik:root@cluster0.6h4xikq.mongodb.net/shop"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
