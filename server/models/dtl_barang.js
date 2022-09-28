'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dtl_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dtl_barang.init({
    jumlah: DataTypes.INTEGER,
    barang_masuk: DataTypes.BOOLEAN,
    barang_keluar: DataTypes.BOOLEAN,
    images: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'dtl_barang',
  });
  return dtl_barang;
};