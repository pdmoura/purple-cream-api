const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));
router.use("/team", require("./team"));

router.get("/", (req, res) => {
	res.send("Purple Cream API");
});

router.use("/", require("./swagger"));

module.exports = router;