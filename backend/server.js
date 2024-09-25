const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddlware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

/**
 * Server for Sprightly Sprocket API
 */

//connect to database
connectDB();
const app = express();

//middleware
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

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
