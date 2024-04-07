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
    cpf: "99999999999",
    nome: "Ana Gonçalves da Silva",
    habilitacao: "Motorista Categoria C",
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
    cpf: "99999999999",
    nome: "Ana Gonçalves da Silva",
    nickname: "ana.silva",
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

var id = 0;

app.get("/", (req, res) => {
  res.redirect("/areaDeTrabalho");
});

app.get("/areaDeTrabalho", (req, res) => {
  res.render("areaDeTrabalho");
});

app.get("/menuMotoristas", (req, res) => {
  res.render("menuMotoristas");
});

app.get("/cadastroMotorista", (req, res) => {
  res.render("cadastroMotorista");
});

app.post("/cadastroMotorista", (req, res) => {
  const cpf = req.body.cpf;
  const nome = req.body.name;
  const dataNasc = req.body.dataNasc;
  const genero = req.body.genero;
  const categoria = req.body.categoria;
  const email = req.body.email;
  const telefone = req.body.telefone;

  console.log(cpf, nome, dataNasc, genero, categoria, email, telefone);

  let erros = [];

  if (!cpf || !nome || !dataNasc || !genero || !categoria || !email || !telefone) {
    erros.push({texto: 'Erro! Os campos devem ser todos preenchidos!'});
    res.render('cadastroMotorista', {erros: erros});
  } else {
    motoristas.push({
      id: id++,
      cpf: cpf,
      nome: nome,
      dataNasc: dataNasc,
      genero: genero,
      categoria: categoria,
      email: email,
      telefone: telefone,
    });
  
    res.status(200).send('<div role="alert" class="alert alert-success"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Motorista cadastrado com sucesso!</span></div>');
  
    res.redirect("/areaDeTrabalho");
  }
});

app.get("/motoristas", (req, res) => {
  res.render("motoristas", { motoristas });
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});

//Ideias Futuras
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/cadastro", (req, res) => {
//   res.render("cadastro");
// });

// app.get("/menuVeiculos", (req, res) => {
//   res.render("menuVeiculos");
// });

// app.get("/cadastroVeiculo", (req, res) => {
//   res.render("cadastroVeiculo");
// });

// app.get("/veiculos", (req, res) => {
//   res.render("veiculos", { veiculos });
// });
