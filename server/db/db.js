const mongoose = require("mongoose");
const config = require('./../config/config.json');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});