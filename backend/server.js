const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddlware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Sprightly Sprocket API" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/parts", require("./routes/partRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to the Sprightly Sprocket API" });
      });
}

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
