'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      kd_produk: {
        type: Sequelize.INTEGER,
        references: {
          model: "kode_produks",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      kd_satuan: {
        type: Sequelize.INTEGER,
        references: {
          model: "kode_satuans",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      price: {
        type: Sequelize.INTEGER
      },
      total_produk: {
        type: Sequelize.INTEGER
      },
      unassigned: {
        type: Sequelize.INTEGER
      },
      rak: {
        type: Sequelize.STRING
      },
      poto_produk: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produks');
  }
};