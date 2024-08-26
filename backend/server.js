const express = require("express");
const cors = require('cors');
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

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/parts", require("./routes/partRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
