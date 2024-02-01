const express = require("express");
const router = new express.Router();
const { upload } = require("../middleware/multer");

const {
  addProjects,
  getProjects,
  deleteProjects,
  addMoreSkills,
  deleteMoreProjects,
  getMoreProjects,
} = require("../controller/projectController");

router.post("/create/project", upload, addProjects);
router.get("/project/all", getProjects);
router.delete("/project/delete/:id", deleteProjects);
router.post("/more/add/project", addMoreSkills);
router.get("/more/project", getMoreProjects);
router.delete("/delete/more/project", deleteMoreProjects);

module.exports = router;
