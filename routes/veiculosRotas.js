const express = require('express');
const router = express.Router();

const VeiculoController = require('../controllers/VeiculoController');
const AuthController = require("../controllers/AuthController");

// router.use(AuthController.makeAuthMiddleware);

router.get("/", VeiculoController.menu);

router.get("/getFormCadastroVeiculo", VeiculoController.getFormCadastro);

router.post("/cadastrarVeiculo", VeiculoController.cadastrar);

router.post("/getListar", VeiculoController.getListar);

router.get("/veiculos", VeiculoController.index);

router.post("/getFormAtualizacao", VeiculoController.getFormAtualizacao);

router.post("/atualizarVeiculo/:id", VeiculoController.atualizar);

router.post("/excluirVeiculo", VeiculoController.delete);

module.exports = router;