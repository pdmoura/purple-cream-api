const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const { productRules, checkId, validate } = require("../middleware/validator");

router.get("/", productsController.getAllProducts);
router.get("/:id", checkId(), validate, productsController.getSingleProduct);
router.post("/", productRules(), validate, productsController.createProduct);
router.put("/:id", checkId(), productRules(true), validate, productsController.updateProduct);
router.delete("/:id", checkId(), validate, productsController.deleteProduct);

module.exports = router;