const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 8080;

// Modify swagger document based on environment
if (process.env.NODE_ENV === "production") {
  swaggerDocument.host = "purple-cream-api.onrender.com";
  swaggerDocument.schemes = ["https"];
} else {
  swaggerDocument.host = `localhost:${PORT}`;
  swaggerDocument.schemes = ["http"];
}

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