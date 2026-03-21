const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team");
const { teamRules, checkId, validate } = require("../middleware/validator");

router.get("/", teamController.getAllTeamMembers);
router.get("/:id", checkId(), validate, teamController.getSingleTeamMember);
router.post("/", teamRules(), validate, teamController.createTeamMember);
router.put("/:id", checkId(), teamRules(true), validate, teamController.updateTeamMember);
router.delete("/:id", checkId(), validate, teamController.deleteTeamMember);

module.exports = router;