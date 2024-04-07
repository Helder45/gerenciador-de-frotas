//Comando para rodar o Watch do Tailwind
//npx tailwindcss -i ./public/css/style.css -o ./dist/output.css --watch

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

let motoristas = [];

var id = 1;

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

  let erros = false;
  let sucesso = false;

  if (!cpf || !nome || !dataNasc || !genero || !categoria || !email || !telefone) {
    erros = true;
    res.render('cadastroMotorista', {erros: erros});
  } else {
    sucesso = true;
    
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
  
    res.render('cadastroMotorista', {sucesso});
  }
});

app.get("/motoristas", (req, res) => {
  res.render("motoristas", { motoristas });
});

app.post("/menuMotoristas", (req, res) => {
  const id = parseInt(req.body.id);

  res.render('motorista', {id});

});

app.get("/motorista/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const motorista = motoristas.find((motorista) => motorista.id === id);

  res.render("motorista", { motorista });
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});

//Ideias Futuras

//let veiculos = [];

//let gerenciadores = [];

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
