const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:2717/farmerShopping", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});