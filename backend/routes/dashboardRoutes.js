 const express = require("express");
const { Router } = require("express");

const { authMiddleware } = require("../middleware/authmiddleware");
const { dashboard } = require("../controllers/dashboardController");

const router = Router();
router.get("/dashboard", authMiddleware,dashboard);


module.exports = router;
