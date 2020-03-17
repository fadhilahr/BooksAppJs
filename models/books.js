'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    price: DataTypes.NUMBER,
    stock: DataTypes.NUMBER
  }, {
    timestamps: false,
    tableName: "books"
  });
  Books.associate = function (models) {
    // associations can be defined here
  };
  return Books;
};