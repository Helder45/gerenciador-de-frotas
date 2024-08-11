const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static signup(req, res) {
    res.render("auth/signup");
  }

  static async cadastrar(req, res) {
    const { email, password, passConfirm } = req.body;

    if (!email || !password || !passConfirm) {
      req.flash(
        "msg",
        "Campos vazios, por favor informe os dados corretamente!"
      );
      AuthController.signup(req, res);
      return;
    }

    if (password != passConfirm) {
      req.flash("msg", "As senhas não podem ser diferentes!");
      AuthController.signup(req, res);
      return;
    }

    const usuario = await Usuario.findOne({ where: { email: email } });

    if (usuario) {
      req.flash("msg", "Já existe um usuário com esse e-mail");

      AuthController.signup(req, res);

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const dadosUsuario = {
      email,
      senha: hashedPassword,
    };

    const user = await Usuario.create(dadosUsuario);

    req.session.userId = user.id;

    req.flash("successMsg", "Usuário cadastrado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static async entrar(req, res) {
    console.log("Entrou no post do entrar");

    const { email, password } = req.body;

    if (!email || !password) {
      req.flash(
        "msg",
        "Campos vazios, por favor informe os dados corretamente!"
      );
      AuthController.login(req, res);
      return;
    }

    const usuario = await Usuario.findOne({ where: { email: email } });
    const senhaCorreta = bcrypt.compareSync(password, usuario.senha);

    console.log(usuario);
    console.log(senhaCorreta);

    if (!usuario || !senhaCorreta) {
      req.flash("msg", "Usuário ou senha inválidos!");

      AuthController.login(req, res);
      return;
    }
    req.flash("successMsg", "Autenticado com sucesso!");
    req.session.userId = usuario.id;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static makeAuthMiddleware(req, res, next) {
    if (!req.session.userId) {
      req.flash("msg", "Você precisa estar logado para acessar essa página!");

      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }

    next();
  }
};
