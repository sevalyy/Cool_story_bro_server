"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    static associate(models) {
      space.belongsTo(models.user, { foreignKey: "userId" });
      space.hasMany(models.story);
    }
  }

  space.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      backgroundColor: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};
