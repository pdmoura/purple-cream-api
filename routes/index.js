const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));
router.use("/team", require("./team"));

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api/api-docs");
});

router.use("/", require("./swagger"));

module.exports = router;