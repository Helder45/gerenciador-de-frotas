const sequelize = require("../database/connection");
const Motorista = require("../models/Motorista");
const Utilizacao = require("../models/Utilizacao");
const Veiculo = require("../models/Veiculo");
const { QueryTypes } = require("sequelize");

module.exports = class UtilizacaoController {
  static menu(req, res) {
    res.render("utilizacao/menuUtilizacao");
  }

  static async getListar(req, res) {
    const id = parseInt(req.body.id);

    const utilizacao = await Utilizacao.findByPk(id, { raw: true });
    console.log("Utilização por ID: ", utilizacao);

    if (utilizacao !== null) {
      UtilizacaoController.utilizacao(req, res, utilizacao);
    } else {
      UtilizacaoController.utilizacao(req, res, utilizacao);
    }
  }

  static utilizacao(req, res, utilizacao) {
    res.render("utilizacao/utilizacao", { utilizacao: utilizacao });
  }

  static async getFormCadastro(req, res) {
    let noDriverAndVehicle = false;
    const motoristasCadastrados = await Motorista.findAll({ raw: true });
    const veiculosCadastrados = await Veiculo.findAll({ raw: true });

    if (
      motoristasCadastrados.length !== 0 ||
      veiculosCadastrados.length !== 0
    ) {
      res.render("utilizacao/formCadastroUtilizacao", {
        motoristas: motoristasCadastrados,
        veiculos: veiculosCadastrados,
        noDriverAndVehicle: noDriverAndVehicle,
      });
    } else {
      noDriverAndVehicle = true;
      res.render("utilizacao/formCadastroUtilizacao", {
        noDriverAndVehicle: noDriverAndVehicle,
      });
    }
  }

  static async index(req, res) {
    const utilizacoes = await Utilizacao.findAll({ raw: true });
    res.render("utilizacao/utilizacoes", { utilizacoes: utilizacoes });
  }

  static async cadastrar(req, res) {
    let erros = false;
    let sucesso = false;

    const dadosUtilizacao = {
      id: 1,
      data_utilizacao: req.body.dataUtil,
      hora_utilizacao: req.body.horaUtil,
      quilometragem_inicial: req.body.km_inicial,
      quilometragem_final: req.body.km_final,
      veiculo_id: parseInt(req.body.veiculo),
      motorista_id: parseInt(req.body.motorista),
    };

    if (
      !dadosUtilizacao.data_utilizacao ||
      !dadosUtilizacao.hora_utilizacao ||
      !dadosUtilizacao.quilometragem_inicial ||
      !dadosUtilizacao.quilometragem_final ||
      !dadosUtilizacao.motorista_id ||
      !dadosUtilizacao.veiculo_id ||
      !dadosUtilizacao
    ) {
      erros = true;
      res.render("utilizacao/formCadastroUtilizacao", { erros: erros });
    } else {
      sucesso = true;
      await Utilizacao.create(dadosUtilizacao);
      res.render("utilizacao/menuUtilizacao", { sucesso });
    }
  }

  static async getFormAtualizacao(req, res) {
    let noDriverAndVehicle = false;
    const motoristasCadastrados = await Motorista.findAll({ raw: true });
    const veiculosCadastrados = await Veiculo.findAll({ raw: true });
    const id = parseInt(req.body.id);
    const utilizacao = await Utilizacao.findByPk(id, { raw: true });

    if (
      motoristasCadastrados.length !== 0 ||
      veiculosCadastrados.length !== 0
    ) {
      res.render("utilizacao/formAtualizacaoUtilizacao", {
        utilizacao: utilizacao,
        motoristas: motoristasCadastrados,
        veiculos: veiculosCadastrados,
        noDriverAndVehicle: noDriverAndVehicle,
      });
    } else {
      noDriverAndVehicle = true;
      res.render("utilizacao/formAtualizacaoUtilizacao", {
        noDriverAndVehicle: noDriverAndVehicle,
      });
    }
  }

  static async atualizar(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.params.id);

    const dadosUtilizacao = {
      id: id,
      data_utilizacao: req.body.dataUtil,
      hora_utilizacao: req.body.horaUtil,
      quilometragem_inicial: req.body.km_inicial,
      quilometragem_final: req.body.km_final,
      veiculo_id: parseInt(req.body.veiculo),
      motorista_id: parseInt(req.body.motorista),
    };
    

    if (
      !id ||
      !dadosUtilizacao.data_utilizacao ||
      !dadosUtilizacao.hora_utilizacao ||
      !dadosUtilizacao.quilometragem_inicial ||
      !dadosUtilizacao.quilometragem_final ||
      !dadosUtilizacao.veiculo_id ||
      !dadosUtilizacao.motorista_id ||
      !dadosUtilizacao
    ) {
      erros = true;
      res.render("utilizacao/formAtualizacaoUtilizacao", { erros: erros });
    } else {
      sucesso = true;

      await Utilizacao.update(dadosUtilizacao, { where: { utilizacao_id: id } });

      res.render("utilizacao/menuUtilizacao", { sucesso });
    }
  }

  static async delete(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.body.ID);

    const ret = await Utilizacao.destroy({ where: { utilizacao_id: id } });

    if (ret === 0) {
      erros = true;
      res.render("utilizacao/menuUtilizacao", { erros });
    } else {
      sucesso = true;
      res.render("utilizacao/menuUtilizacao", { sucesso });
    }
  }
};
