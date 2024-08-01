const conn = require("../database/connection");
const { DataTypes } = require("sequelize");

const Veiculo = conn.define("Veiculo", {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_chassi: {
    type: DataTypes.STRING,
    // unique: true,
    allowNull: false,
  },
  quilometragem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  data_aquisicao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ultima_man: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proxima_man: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status_seguro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidade_carga: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_veiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Veiculo;
