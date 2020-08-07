const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:2717/user-account-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});