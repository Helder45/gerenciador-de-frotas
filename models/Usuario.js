const conn = require("../database/connection");
const { DataTypes } = require("sequelize");

const Usuario = conn.define("Usuario", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
