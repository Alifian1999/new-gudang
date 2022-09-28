'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tmpt_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tmpt_barang.init({
    jumlah: DataTypes.INTEGER,
    lokasi: DataTypes.STRING,
    id_produks: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tmpt_barang',
  });
  return tmpt_barang;
};