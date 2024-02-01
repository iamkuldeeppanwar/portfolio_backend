const express = require("express");
const { adminLogin } = require("../controller/userController");
const router = new express.Router();

router.post("/admin/login", adminLogin);

module.exports = router;
