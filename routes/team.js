const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team");
const { teamValidationRules, checkId, validate } = require("../middleware/validator");

router.get("/", teamController.getAllTeamMembers);
router.get("/:id", checkId(), validate, teamController.getSingleTeamMember);
router.post("/", teamValidationRules(), validate, teamController.createTeamMember);
router.put("/:id", checkId(), teamValidationRules(), validate, teamController.updateTeamMember);
router.delete("/:id", checkId(), validate, teamController.deleteTeamMember);

module.exports = router;