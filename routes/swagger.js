const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", 
  (req, res, next) => {
    // #swagger.ignore = true
    next();
  },
  swaggerUi.setup(swaggerDocument)
);

module.exports = router;
