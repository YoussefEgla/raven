import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
  .connect("mongodb://localhost/raven", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB successfully`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });