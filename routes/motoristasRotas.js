const express = require('express');
const router = express.Router();

const MotoristaController = require('../controllers/MotoristaController');
const AuthController = require("../controllers/AuthController");

// router.use(AuthController.makeAuthMiddleware);

router.get("/", MotoristaController.menuMotoristas);

router.get("/cadastroMotorista", MotoristaController.getFormCadastro);

router.post("/cadastroMotorista", MotoristaController.cadastrar);

router.post("/findListar", MotoristaController.findListar);

router.get("/motorista", MotoristaController.motorista);

router.get("/motoristas", MotoristaController.index);

router.post("/findAtualizar", MotoristaController.findAtualizar);

router.put("/atualizacaoMotorista/:id", MotoristaController.atualizar);

router.post("/excluirMotorista", MotoristaController.deletar);

module.exports = router;