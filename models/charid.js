'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class charID extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.charid.hasMany(models.jobs)
      models.charid.hasMany(models.notes)
    }
  };
  charID.init({
    charID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'charID',
  });
  return charID;
};