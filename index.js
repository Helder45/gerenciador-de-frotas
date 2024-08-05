//Comando para rodar o Watch do Tailwind
//npx tailwindcss -i ./public/css/style.css -o ./dist/output.css --watch
require("dotenv").config();
const hbs = require("express-handlebars");
const exp = require("express");
const app = exp();

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

//projects basics
const conn = require("./database/connection");
const Motorista = require("./models/Motorista");
const rotasMotoristas = require("./routes/motoristasRotas");
const rotasVeiculos = require("./routes/veiculosRotas");
const rotasUtilizacao = require("./routes/utilizacaoRotas");
const Utilizacao = require("./models/Utilizacao");
// const authRotas = require("./routes/authRotas");


//Settings
//Express
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


//Pasta Estática
app.use(exp.static("public"));
app.use("/css", exp.static("dist"));

//Usando Handlebars for views 
app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.use("/menuMotoristas", rotasMotoristas);
app.use("/menuVeiculos", rotasVeiculos);
app.use("/menuUtilizacao", rotasUtilizacao);

conn
  .sync()
  .then(() => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/cadastro", (req, res) => {
//   res.render("cadastro");
// });