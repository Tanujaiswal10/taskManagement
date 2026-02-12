require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const route = require("./route/indexRoute")
const errorHandler = require("./middleware/error.middleware")

const app = express();

app.use(express.json());

// Connect Database
connectDB();

//Route
app.use("/api/v1",route)

//central error middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
