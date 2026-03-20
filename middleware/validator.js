const { body, param, validationResult } = require("express-validator");

const productValidationRules = () => {
	return [
		param("id")
			.isMongoId()
			.withMessage("Invalid ID"),
		body("name")
			.trim()
			.notEmpty()
			.withMessage("Name is required")
			.isString()
			.withMessage("Name must be a string"),
		body("ingredients")
			.trim()
			.notEmpty()
			.withMessage("Ingredients are required")
			.isString()
			.withMessage("Ingredients must be a string"),
		body("price")
			.isFloat({ min: 0 })
			.withMessage("Price must be a positive number"),
		body("image")
			.trim()
			.notEmpty()
			.withMessage("Image URL is required")
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

const teamValidationRules = () => {
	return [
		param("id")
			.isMongoId()
			.withMessage("Invalid ID"),
		body("name")
			.trim()
			.notEmpty()
			.withMessage("Name is required")
			.isString()
			.withMessage("Name must be a string"),
		body("title")
			.trim()
			.notEmpty()
			.withMessage("Title is required")
			.isString()
			.withMessage("Title must be a string"),
		body("description")
			.trim()
			.notEmpty()
			.withMessage("Description is required")
			.isString()
			.withMessage("Description must be a string"),
		body("image")
			.trim()
			.notEmpty()
			.withMessage("Image URL is required")
			.isString()
			.withMessage("Image must be a string"),
		body("role")
			.optional()
			.isString()
			.isIn(["Founder", "Management", "Staff"])
			.withMessage("Invalid role"),
		body("email")
			.optional()
			.isEmail()
			.withMessage("Must be a valid email address"),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	return res.status(400).json({ errors: errors.array() });
};

module.exports = { productValidationRules, teamValidationRules, validate };
