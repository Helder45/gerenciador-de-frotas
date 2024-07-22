const conn = require("../database/connection");
const { DataTypes } = require("sequelize");

const Motorista = conn.define("Motorista", {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataNasc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

module.exports = Motorista;