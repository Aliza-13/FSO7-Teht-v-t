require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

console.log("ENV:", process.env.NODE_ENV);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
    console.log("Connected database:", mongoose.connection.name);

    const PORT = process.env.PORT || 3003;

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
