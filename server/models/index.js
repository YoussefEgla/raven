const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/raven", {
  keepAlive: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useMongoClient: true,
});
