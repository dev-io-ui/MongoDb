const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('678902f78c9a5f8d00f14871').then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://akashpuranik06:root@cluster0.ti10o.mongodb.net/shop"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "dev",
          email: "dev@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("connect");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
