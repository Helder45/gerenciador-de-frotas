const conn = require("../database/connection");
const { DataTypes } = require("sequelize");

const Motorista = require("./Motorista");
const Veiculo = require("./Veiculo");

const Utilizacao = conn.define("Utilizacao", {
  data_utilizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_utilizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quilometragem_inicial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quilometragem_final: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Veiculo.belongsToMany(Motorista, { through: Utilizacao });
Motorista.belongsToMany(Veiculo, { through: Utilizacao });

module.exports = Utilizacao;
