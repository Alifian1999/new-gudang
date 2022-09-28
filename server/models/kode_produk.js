'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kode_produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kode_produk.init({
    kd_produk: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kode_produk',
  });
  return kode_produk;
};