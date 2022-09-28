'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kode_satuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kode_satuan.init({
    kd_satuan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kode_satuan',
  });
  return kode_satuan;
};