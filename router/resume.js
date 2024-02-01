const express = require("express");
const router = new express.Router();
const { upload } = require("../middleware/multer");
const {
  addResume,
  getResume,
  deleteResume,
} = require("../controller/resumeController");

router.post("/add/resume", upload, addResume);
router.get("/get/resume", upload, getResume);
router.delete("/delete/resume/:id", deleteResume);

module.exports = router;
