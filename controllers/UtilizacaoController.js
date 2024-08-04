const Motorista = require("../models/Motorista");
const Utilizacao = require("../models/Utilizacao");

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

  static getFormCadastro(req, res) {
    res.render("formCadastroUtilizacao");
  }

  static async index(req, res) {
    const utilizacoes = await Utilizacao.findAll({ raw: true });

    console.log("Utilizações: ", utilizacoes);

    res.render("utilizacoes", { utilizacoes });
  }

  static async cadastrar(req, res) {
    let dupErr = false;
    let erros = false;
    let sucesso = false;

    const dadosUtilizacao = {
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

    const utilizacao_cadastrado = await Utilizacao.findOne({
      where: { num_chassi: dadosUtilizacao.num_chassi },
    });

    if (utilizacao_cadastrado === null) {
      if (
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
        res.render("formCadastroUtilizacao", { erros: erros });
      } else {
        sucesso = true;

        await Utilizacao.create(dadosUtilizacao);
        res.render("menuUtilizacao", { sucesso });
      }
    } else {
      dupErr = true;
      res.render("formCadastroUtilizacao", { dupErr: dupErr });
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
