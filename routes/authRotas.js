const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.login);

router.get("/cadastro", AuthController.signup);

router.post("/cadastrar", AuthController.cadastrar);

router.post("/entrar", AuthController.entrar);

router.get("/sair", AuthController.logout);

module.exports = router;