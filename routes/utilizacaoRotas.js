const express = require('express');
const router = express.Router();

const UtilizacaoController = require('../controllers/UtilizacaoController');
const AuthController = require("../controllers/AuthController");

// router.use(AuthController.makeAuthMiddleware);

router.get("/", UtilizacaoController.menu);

router.get("/getFormCadastroUtilizacao", UtilizacaoController.getFormCadastro);

router.post("/cadastrarUtilizacao", UtilizacaoController.cadastrar);

router.post("/getListar", UtilizacaoController.getListar);

router.get("/utilizacoes", UtilizacaoController.index);

router.post("/getFormAtualizacao", UtilizacaoController.getFormAtualizacao);

router.post("/atualizarUtilizacao/:id", UtilizacaoController.atualizar);

router.post("/excluirUtilizacao", UtilizacaoController.delete);

module.exports = router;