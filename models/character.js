'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.character.hasMany(models.job)
    }
  };
  character.init({
    player: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};