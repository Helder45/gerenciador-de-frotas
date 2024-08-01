const Veiculo = require("../models/Veiculo");

module.exports = class VeiculoController {
  static menu(req, res) {
    res.render("menuVeiculos");
  }

  static async getListar(req, res) {
    const id = parseInt(req.body.id);

    const veiculo = await Veiculo.findByPk(id, { raw: true });

    if (veiculo !== null) {
      const veiculoFormatado = {
        id: veiculo.id,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        placa: veiculo.placa,
        num_chassi: veiculo.num_chassi,
        quilometragem: veiculo.quilometragem,
        status: veiculo.status,
        preco: veiculo.preco,
        data_aquisicao: veiculo.data_aquisicao,
        ultima_man: veiculo.ultima_man,
        proxima_man: veiculo.proxima_man,
        status_seguro: veiculo.status_seguro,
        capacidade_carga: veiculo.capacidade_carga,
        tipo_veiculo: veiculo.tipo_veiculo,
      };
      VeiculoController.veiculo(req, res, veiculoFormatado);
    } else {
      VeiculoController.veiculo(req, res, veiculo);
    }
  }

  static veiculo(req, res, veiculo) {
    res.render("veiculo", { veiculo: veiculo });
  }

  static getFormCadastro(req, res) {
    res.render("formCadastroVeiculo");
  }

  static async index(req, res) {
    const veiculos = await Veiculo.findAll({ raw: true });

    const veiculoFormatado = veiculos.map((vehicle) => {
      const veiculo = {
        id: vehicle.id,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        ano: vehicle.ano,
        placa: vehicle.placa,
        num_chassi: vehicle.num_chassi,
        quilometragem: vehicle.quilometragem,
        status: vehicle.status,
        preco: vehicle.preco,
        data_aquisicao: vehicle.data_aquisicao,
        ultima_man: vehicle.ultima_man,
        proxima_man: vehicle.proxima_man,
        status_seguro: vehicle.status_seguro,
        capacidade_carga: vehicle.capacidade_carga,
        tipo_veiculo: vehicle.tipo_veiculo,
      };
      return veiculo;
    });
    res.render("veiculos", { veiculos: veiculoFormatado });
  }

  static async cadastrar(req, res) {
    let dupErr = false;
    let erros = false;
    let sucesso = false;

    const dadosVeiculo = {
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
      tipo_veiculo: req.body.tipo_veiculo,
    };

    const veiculo_cadastado = await Veiculo.findOne({
      where: { num_chassi: dadosVeiculo.num_chassi },
    });

    if (veiculo_cadastado === null) {
      if (
        !dadosVeiculo.marca ||
        !dadosVeiculo.modelo ||
        !dadosVeiculo.ano ||
        !dadosVeiculo.placa ||
        !dadosVeiculo.num_chassi ||
        !dadosVeiculo.quilometragem ||
        !dadosVeiculo.status ||
        !dadosVeiculo.preco ||
        !dadosVeiculo.data_aquisicao ||
        !dadosVeiculo.ultima_man ||
        !dadosVeiculo.proxima_man ||
        !dadosVeiculo.status_seguro ||
        !dadosVeiculo.capacidade_carga ||
        !dadosVeiculo.tipo_veiculo ||
        !dadosVeiculo
      ) {
        erros = true;
        res.render("formCadastroVeiculo", { erros: erros });
      } else {
        sucesso = true;

        await Veiculo.create(dadosVeiculo);
        res.render("menuVeiculos", { sucesso });
      }
    } else {
      dupErr = true;
      res.render("formCadastroVeiculo", { dupErr: dupErr });
    }
  }

  static async getFormAtualizacao(req, res) {
    const id = parseInt(req.body.id);

    const veiculo = await Veiculo.findByPk(id, { raw: true });

    res.render("formAtualizacaoVeiculo", { veiculo: veiculo });
  }

  static async atualizar(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.params.id);

    const dadosVeiculo = {
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
      tipo_veiculo: req.body.tipo_veiculo,
    };

    if (
      !id ||
      !dadosVeiculo.marca ||
      !dadosVeiculo.modelo ||
      !dadosVeiculo.ano ||
      !dadosVeiculo.placa ||
      !dadosVeiculo.num_chassi ||
      !dadosVeiculo.quilometragem ||
      !dadosVeiculo.status ||
      !dadosVeiculo.preco ||
      !dadosVeiculo.data_aquisicao ||
      !dadosVeiculo.ultima_man ||
      !dadosVeiculo.proxima_man ||
      !dadosVeiculo.status_seguro ||
      !dadosVeiculo.capacidade_carga ||
      !dadosVeiculo.tipo_veiculo ||
      !dadosVeiculo
    ) {
      erros = true;
      res.render("formAtualizacaoVeiculo", { erros: erros });
    } else {
      sucesso = true;

      await Veiculo.update(dadosVeiculo, { where: { id: id } });

      res.render("menuVeiculos", { sucesso });
    }
  }

  static async delete(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.body.ID);

    const ret = await Veiculo.destroy({ where: { id: id } });

    if (ret === 0) {
      erros = true;
      res.render("menuVeiculos", { erros });
    } else {
      sucesso = true;
      res.render("menuVeiculos", { sucesso });
    }
  }
};
