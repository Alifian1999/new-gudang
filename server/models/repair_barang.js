'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repair_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  repair_barang.init({
    jumlah: DataTypes.INTEGER,
    alasan: DataTypes.STRING,
    id_produks: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'repair_barang',
  });
  return repair_barang;
};