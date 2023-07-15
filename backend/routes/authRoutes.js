const express = require("express");
const { register, login, changePassword } = require("../controllers/authController");
const { registerValidations, loginValidations, passwordValidations } = require("../validations/expressValidator");

const router = express.Router();

router.post("/register",registerValidations, register);
router.post("/login", loginValidations, login);

router.post("/changepassword",passwordValidations, changePassword);



module.exports = router;
