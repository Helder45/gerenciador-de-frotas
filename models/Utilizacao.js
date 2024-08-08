const conn = require("../database/connection");
const { DataTypes } = require("sequelize");

const Motorista = require("./Motorista");
const Veiculo = require("./Veiculo");

const Utilizacao = conn.define("Utilizacao", {
  utilizacao_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
    allowNull: false,
  },
  veiculo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Veiculo,
      key: 'id',
    },
  },
  motorista_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Motorista,
      key: 'id',
    },
  }
});

// Veiculo.belongsToMany(Motorista, {
//   through: Utilizacao,
//   foreignKey: { name: "veiculo_id", allowNull: false },
// });
// Motorista.belongsToMany(Veiculo, {
//   through: Utilizacao,
//   foreignKey: { name: "motorista_id", allowNull: false },
// });

module.exports = Utilizacao;
