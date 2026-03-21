const { body, param, validationResult } = require("express-validator");

const checkId = () => {
  return [param("id").isMongoId().withMessage("Invalid ID")];
};

const productRules = (isUpdate = false) => {
  const field = (name) => (isUpdate ? body(name).optional() : body(name));

  return [
    field("name")
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    field("ingredients")
      .trim()
      .notEmpty()
      .withMessage("Ingredients cannot be empty")
      .isString()
      .withMessage("Ingredients must be a string"),
    field("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    field("image")
      .trim()
      .notEmpty()
      .withMessage("Image URL cannot be empty")
      .isString()
      .withMessage("Image must be a string"),
      
    body("category")
      .optional()
      .isString()
      .trim()
      .withMessage("Category must be a string"),
    body("calories")
      .optional()
      .isNumeric()
      .withMessage("Calories must be a number"),
  ];
};

const teamRules = (isUpdate = false) => {
  const field = (name) => (isUpdate ? body(name).optional() : body(name));

  return [
    field("name")
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    field("title")
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isString()
      .withMessage("Title must be a string"),
    field("description")
      .trim()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .isString()
      .withMessage("Description must be a string"),
    field("image")
      .trim()
      .notEmpty()
      .withMessage("Image URL cannot be empty")
      .isString()
      .withMessage("Image must be a string"),
    field("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Must be a valid email address"),
      
    body("role")
      .optional()
      .isString()
      .isIn(["Founder", "Management", "Staff"])
      .withMessage("Invalid role"),
    body("hobbies")
      .optional()
      .isArray()
      .withMessage("Hobbies must be an array of strings"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};


module.exports = {
  checkId,
  productRules,
  teamRules,
  validate,
};