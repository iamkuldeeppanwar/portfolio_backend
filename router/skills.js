const express = require("express");
const {
  addSkill,
  deleteSkill,
  getSkills,
} = require("../controller/skillsController");
const router = new express.Router();

router.post("/add/skills", addSkill);
router.get("/get/skills", getSkills);
router.delete("/delete/skills/:id", deleteSkill);

module.exports = router;
