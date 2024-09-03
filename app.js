const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/errors");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
  User.findById("66d6f07d3b5ad7f2ed26e3ec")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

mongoose
  .connect(
    "mongodb+srv://minimel:sF4HhJg3Y5AGuHiF@cluster0.rbj6q.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "minimel",
          email: "test@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(4000);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
