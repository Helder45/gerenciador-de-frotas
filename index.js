const exphbs = require("express-handlebars");
const exp = require("express");
const app = exp();

//Settings
//Express
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use(exp.static("public"));
//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

var usuarios = [
  {
    id: 1,
    nome: "Ana Gonçalves da Silva",
    cargo: "Motorista Categoria C",
    nickname: "ana.silva",
    password: "",
  },
  {
    id: 2,
    nome: "Pedro Bittencurt",
    cargo: "Motorista Categoria A/B",
    nickname: "pedro_bittencurt",
    password: "",
  },
  {
    id: 3,
    nome: "Alex Bastos de Souza",
    cargo: "Motorista Categoria A",
    nickname: "alex.bsouza",
    password: "",
  },
];

var proximoId = 4;

app.get("/", (req, res) => {
    res.redirect("/usuarios");
});

app.get("/usuarios", (req, res) => {
    res.render("usuarios", { usuarios });
  });

app.listen(7000, () => {
    console.log("Server rodando");
  });