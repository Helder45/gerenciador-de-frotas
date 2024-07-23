const Motorista = require("../models/Motorista");
const formatter = require("../helpers/formatter");

module.exports = class MotoristaController {
  static menuMotoristas(req, res) {
    res.render("menuMotoristas");
  }

  static async findListar(req, res) {
    const id = parseInt(req.body.id);

    const motorista = await Motorista.findByPk(id);

    if (motorista !== null) {
      const motoristaFormatado = {
        id: motorista.dataValues.id,
        cpf: formatter.cpfFormatter(motorista.dataValues.cpf),
        nome: motorista.dataValues.nome,
        dataNasc: formatter.dateFormatted(motorista.dataValues.dataNasc),
        genero: motorista.dataValues.genero,
        categoria: motorista.dataValues.categoria,
        email: motorista.dataValues.email,
        telefone: formatter.mphone(motorista.dataValues.telefone),
        createdAt: motorista.dataValues.createdAt,
        updatedAt: motorista.dataValues.updatedAt,
      };

      res.render("motorista", { motorista: motoristaFormatado });
    } else {
      res.render("motorista", { motorista });
    }
  }

  static motorista(req, res) {
    res.render("motorista");
  }

  static getFormCadastro(req, res) {
    res.render("cadastroMotorista");
  }

  static async index(req, res) {
    const motoristas = await Motorista.findAll({ raw: true });

    const motoristaFormatado = motoristas.map((mot) => {
      const motorista = {
        id: mot.id,
        cpf: formatter.cpfFormatter(mot.cpf),
        nome: mot.nome,
        dataNasc: formatter.dateFormatted(mot.dataNasc),
        genero: mot.genero,
        categoria: mot.categoria,
        email: mot.email,
        telefone: formatter.mphone(mot.telefone),
        createdAt: mot.createdAt,
        updatedAt: mot.updatedAt,
      };
      return motorista;
    }); 
    res.render("motoristas", { motoristas: motoristaFormatado });
  }

  static async cadastrar(req, res) {
    let dupErr = false;
    let erros = false;
    let sucesso = false;

    const dadosMotorista = {
      cpf: req.body.cpf,
      nome: req.body.name,
      dataNasc: req.body.dataNasc,
      genero: req.body.genero,
      categoria: req.body.categoria,
      email: req.body.email,
      telefone: req.body.telefone,
    };

    console.log(dadosMotorista.genero);

    const motoristaCad = await Motorista.findOne({
      where: { cpf: dadosMotorista.cpf },
    });

    if (motoristaCad === null) {
      if (
        !dadosMotorista.cpf ||
        !dadosMotorista.nome ||
        !dadosMotorista.dataNasc ||
        !dadosMotorista.genero ||
        !dadosMotorista.categoria ||
        !dadosMotorista.email ||
        !dadosMotorista.telefone ||
        !dadosMotorista
      ) {
        erros = true;
        res.render("cadastroMotorista", { erros: erros });
      } else {
        sucesso = true;

        const motorista = await Motorista.create(dadosMotorista);
        // res.send(`Motorista criado com sucesso com o ID ${motorista.id}!`);
        res.render("menuMotoristas", { sucesso });
      }
    } else {
      dupErr = true;
      res.render("cadastroMotorista", { dupErr: dupErr });
    }
  }

  static async getFormAtualizacao(req, res) {
    res.render("atualizarMotorista");

    // const id = parseInt(req.params.id);

    // const motorista = await Motorista.findByPk(id, { raw: true });

    // if (motorista != null) {
    //   res.render("cadastroMotorista", { motorista });
    // } else {
    //   res.redirect("/motorista");
    // }
  }

  static async findAtualizar(req, res) {
    const id = parseInt(req.body.id);

    const motorista = await Motorista.findByPk(id);

    res.render("atualizarMotorista", { motorista });
  }

  static async atualizar(req, res) {
    let erros = false;
    let sucesso = false;

    const dadosMotorista = {
      cpf: req.body.cpf,
      nome: req.body.cpf,
      dataNasc: req.body.dataNasc,
      genero: req.body.genero,
      categoria: req.body.categoria,
      email: req.body.email,
      telefone: req.body.telefone,
    };

    if (
      !dadosMotorista.cpf ||
      !dadosMotorista.nome ||
      !dadosMotorista.dataNasc ||
      !dadosMotorista.genero ||
      !dadosMotorista.categoria ||
      !dadosMotorista.email ||
      !dadosMotorista.telefone ||
      !dadosMotorista
    ) {
      erros = true;
      res.render("atualizarMotorista", { erros: erros });
    } else {
      sucesso = true;

      await Motorista.update(dadosMotorista, { where: { id: id } });

      res.render("menuMotoristas", { sucesso });
    }
  }

  static async deletar(req, res) {
    let erros = false;
    let sucesso = false;

    const id = parseInt(req.body.ID);

    const ret = await Motorista.destroy({ where: { id: id } });

    if (ret === 0) {
      erros = true;
      res.render("menuMotoristas", { erros });
    } else {
      sucesso = true;
      res.render("menuMotoristas", { sucesso });
    }

    console.log("Retorno da query: ", ret);
    console.log("Tipo do retorno da query: ", typeof ret);
  }
};
