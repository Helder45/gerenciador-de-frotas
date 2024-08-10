const sequelize = require("../database/connection");
const Motorista = require("../models/Motorista");
const Utilizacao = require("../models/Utilizacao");
const Veiculo = require("../models/Veiculo");
const { QueryTypes } = require("sequelize");

module.exports = class UtilizacaoController {
  static menu(req, res) {
    res.render("menuUtilizacao");
  }

  static async getListarPorMotorista(req, res) {
    const id = parseInt(req.body.id);

    const utilizacao = await Utilizacao.findAll({ include: Motorista });
    console.log("Utilização: ", JSON.stringify(utilizacao));

    if (utilizacao !== null) {
      UtilizacaoController.utilizacao(req, res, utilizacaoFormatado);
    } else {
      UtilizacaoController.utilizacao(req, res, utilizacao);
    }
  }

  static utilizacao(req, res, utilizacao) {
    res.render("utilizacao", { utilizacao: utilizacao });
  }

  static async getFormCadastro(req, res) {
    let noDriverAndVehicle = false;
    const motoristasCadastrados = await Motorista.findAll({ raw: true });
    const veiculosCadastrados = await Veiculo.findAll({ raw: true });

    if (
      motoristasCadastrados.length !== 0 ||
      veiculosCadastrados.length !== 0
    ) {
      res.render("formCadastroUtilizacao", {
        motoristas: motoristasCadastrados,
        veiculos: veiculosCadastrados,
        noDriverAndVehicle: noDriverAndVehicle,
      });
    } else {
      noDriverAndVehicle = true;
      res.render("formCadastroUtilizacao", {
        noDriverAndVehicle: noDriverAndVehicle,
      });
    }
  }

  static async index(req, res) {
    const utilizacoes = await Utilizacao.findAll({ raw: true });
    res.render("utilizacoes", { utilizacoes: utilizacoes });
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
      res.render("formCadastroUtilizacao", { erros: erros });
    } else {
      sucesso = true;
      await Utilizacao.create(dadosUtilizacao);
      res.render("menuUtilizacao", { sucesso });
    }
  }

  static async getFormAtualizacao(req, res) {
    const id = parseInt(req.body.id);

    const utilizacao = await Utilizacao.findByPk(id, { raw: true });

    res.render("formAtualizacaoUtilizacao", { utilizacao: utilizacao });
  }

  static async atualizar(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.params.id);

    const dadosUtilizacao = {
      id: id,
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      placa: req.body.placa,
      num_chassi: req.body.num_chassi,
      quilometragem: req.body.quilometragem,
      status: req.body.status,
      preco: req.body.preco,
      data_aquisicao: req.body.data_aquisicao,
      ultima_man: req.body.ultima_man,
      proxima_man: req.body.proxima_man,
      status_seguro: req.body.status_seguro,
      capacidade_carga: req.body.capacidade_carga,
      tipo_utilizacao: req.body.tipo_utilizacao,
    };

    if (
      !id ||
      !dadosUtilizacao.marca ||
      !dadosUtilizacao.modelo ||
      !dadosUtilizacao.ano ||
      !dadosUtilizacao.placa ||
      !dadosUtilizacao.num_chassi ||
      !dadosUtilizacao.quilometragem ||
      !dadosUtilizacao.status ||
      !dadosUtilizacao.preco ||
      !dadosUtilizacao.data_aquisicao ||
      !dadosUtilizacao.ultima_man ||
      !dadosUtilizacao.proxima_man ||
      !dadosUtilizacao.status_seguro ||
      !dadosUtilizacao.capacidade_carga ||
      !dadosUtilizacao.tipo_utilizacao ||
      !dadosUtilizacao
    ) {
      erros = true;
      res.render("formAtualizacaoUtilizacao", { erros: erros });
    } else {
      sucesso = true;

      await Utilizacao.update(dadosUtilizacao, { where: { id: id } });

      res.render("menuUtilizacao", { sucesso });
    }
  }

  static async delete(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.body.ID);

    const ret = await Utilizacao.destroy({ where: { id: id } });

    if (ret === 0) {
      erros = true;
      res.render("menuUtilizacao", { erros });
    } else {
      sucesso = true;
      res.render("menuUtilizacao", { sucesso });
    }
  }
};
