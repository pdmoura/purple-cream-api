const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const { productValidationRules, checkId, validate } = require("../middleware/validator");

router.get("/", productsController.getAllProducts);
router.get("/:id", checkId(), validate, productsController.getSingleProduct);
router.post("/", productValidationRules(), validate, productsController.createProduct);
router.put("/:id", checkId(), productValidationRules(), validate, productsController.updateProduct);
router.delete("/:id", checkId(), validate, productsController.deleteProduct);

module.exports = router;