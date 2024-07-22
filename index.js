//Comando para rodar o Watch do Tailwind
//npx tailwindcss -i ./public/css/style.css -o ./dist/output.css --watch
require("dotenv").config();
const exphbs = require("express-handlebars");
const exp = require("express");
const app = exp();

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const conn = require("./database/connection");
const Motorista = require("./models/Motorista");
const rotasMotoristas = require("./routes/motoristasRotas");
// const authRotas = require("./routes/authRotas");


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

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/menuMotoristas", (req, res) => {
  res.render("menuMotoristas");
});

app.use("/menuMotoristas", rotasMotoristas);

// app.get("/cadastroMotorista", (req, res) => {
//   res.render("cadastroMotorista");
// });

// app.post("/cadastroMotorista", (req, res) => {
//   const cpf = req.body.cpf;
//   const nome = req.body.name;
//   const dataNasc = req.body.dataNasc;
//   const genero = req.body.genero;
//   const categoria = req.body.categoria;
//   const email = req.body.email;
//   const telefone = req.body.telefone;

//   let erros = false;
//   let sucesso = false;

//   if (!cpf || !nome || !dataNasc || !genero || !categoria || !email || !telefone) {
//     erros = true;
//     res.render('cadastroMotorista', {erros: erros});
//   } else {
//     sucesso = true;
    
//     motoristas.push({
//       id: id++,
//       cpf: cpf,
//       nome: nome,
//       dataNasc: dataNasc,
//       genero: genero,
//       categoria: categoria,
//       email: email,
//       telefone: telefone,
//     });
  
//     res.render('menuMotoristas', {sucesso});
//   }
// });

// app.get("/motoristas", (req, res) => {
//   res.render("motoristas", { motoristas });
// });

// app.get("/atualizarMotorista", (req, res) => {
//   res.render("atualizarMotorista");
// });

// app.post("/menuMotoristas", (req, res) => {
//   const id = parseInt(req.body.id);

//   const motorista = motoristas.find((motorista) => motorista.id === id);

//   res.render("motorista", { motorista });

// });

// app.post("/atualizarMotorista", (req, res) => {
//   const id = parseInt(req.body.id);

//   const motorista = motoristas.find((motorista) => motorista.id === id);

//   res.render("atualizarMotorista", { motorista });

// });

// app.post("/atualizacaoMotorista", (req, res) => {

//   let erros = false;
//   let sucesso = false;

//   const cpf = req.body.cpf;
//   const nome = req.body.name;
//   const dataNasc = req.body.dataNasc;
//   const genero = req.body.genero;
//   const categoria = req.body.categoria;
//   const email = req.body.email;
//   const telefone = req.body.telefone;

//   if (!cpf || !nome || !dataNasc || !genero || !categoria || !email || !telefone) {
//     erros = true;
//     res.render('atualizarMotorista', {erros: erros});
//   } else {
//     sucesso = true;

//     const motoristaIndex = motoristas.findIndex((motorista) => motorista.cpf == cpf);

//     if (motoristaIndex !== -1) {
//       // Atualiza os dados do motorista encontrado
//       motoristas[motoristaIndex] = {
//         ...motoristas[motoristaIndex],
//         cpf,
//         nome,
//         dataNasc,
//         genero,
//         categoria,
//         email,
//         telefone
//       };
//     }

//   res.render("menuMotoristas", {sucesso});
//   }
// });

// app.post("/excluirMotorista", (req, res) => {

//   let erros = false;

//   const cpf = parseInt(req.body.cpf);

//   if (!cpf) {
//     erros = true;
//     res.render('menuMotoristas', {erros});
//   } else {
//     sucesso = true;

//     const motoristaIndex = motoristas.findIndex((motorista) => motorista.cpf == cpf);

//     if (motoristaIndex !== -1) {
  
//       motoristas.splice(motoristaIndex, 1);

//       for (let i = 0; i < motoristas.length; i++) {
//         motoristas[i].id = i + 1;
//       }
//     }

//   res.render("menuMotoristas", {sucesso});
  
//   }
// });

conn
  .sync()
  .then(() => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => {
    console.log(err);
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
