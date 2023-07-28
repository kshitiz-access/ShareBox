const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  // database connection

  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  // console.log(connection);

  connection
    .once("open", () => {
      console.log("Database Connected");
    })
    .on("error", (err) => {
      console.log("Connection Failed.", err);
    });
}

module.exports = connectDB;
