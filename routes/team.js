const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team");
const { teamRules, checkId, validate } = require("../middleware/validator");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", teamController.getAllTeamMembers);
router.get("/:id", checkId(), validate, teamController.getSingleTeamMember);
router.post("/", isAuthenticated, teamRules(), validate, teamController.createTeamMember);
router.put("/:id", isAuthenticated, checkId(), teamRules(true), validate, teamController.updateTeamMember);
router.delete("/:id", isAuthenticated, checkId(), validate, teamController.deleteTeamMember);

module.exports = router;