const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); 

// Initialize DB
connectDB();

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api/api-docs");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});