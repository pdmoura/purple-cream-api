const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const { productRules, checkId, validate } = require("../middleware/validator");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", productsController.getAllProducts);
router.get("/:id", checkId(), validate, productsController.getSingleProduct);
router.post("/", isAuthenticated, productRules(), validate, productsController.createProduct);
router.put("/:id", isAuthenticated, checkId(), productRules(true), validate, productsController.updateProduct);
router.delete("/:id", isAuthenticated, checkId(), validate, productsController.deleteProduct);

module.exports = router;