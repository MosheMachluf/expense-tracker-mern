const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const transactionsRoute = require("./routes/transactions");
app.use("/api/transactions", transactionsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use((req, res) => res.send("404 Page Not Found!"));

const PORT = process.env.PORT || 4000;
app.listen(
  4000,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
