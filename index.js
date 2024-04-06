const exphbs = require("express-handlebars");
const exp = require("express");
const app = exp();

//Settings
//Express
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());

//Pasta Estática
app.use(exp.static("public"));
app.use("/css", exp.static("dist"));

//Usando Handlebars for views
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

let motoristas = [
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

let gerenciadores = [
  {
    id: 1,
    nome: "ger1",
    nickname: "ger.1",
    password: "",
  },
  {
    id: 2,
    nome: "ger2",
    nickname: "ger.2",
    password: "",
  },
  {
    id: 3,
    nome: "ger3",
    nickname: "ger.3",
    password: "",
  },
];

let veiculos = [
  {
    num_chassi: 1,
    nome: "Carro1",
    modelo: "Modelo1",
    ano_fabri: "ano1",
    marca: "marca1",
    placa: "placa1",
    status: "status1",
  },
  {
    num_chassi: 2,
    nome: "Carro2",
    modelo: "Modelo2",
    ano_fabri: "ano2",
    marca: "marca2",
    placa: "placa2",
    status: "status2",
  },
  {
    num_chassi: 3,
    nome: "Carro3",
    modelo: "Modelo3",
    ano_fabri: "ano3",
    marca: "marca3",
    placa: "placa3",
    status: "status3",
  },
];

var proximoId = 4;

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/motoristas", (req, res) => {
    res.render("motoristas", { motoristas });
  });

  app.get("/veiculos", (req, res) => {
    res.render("veiculos", { veiculos });
  });

app.listen(7000, () => {
    console.log("Server rodando");
  });