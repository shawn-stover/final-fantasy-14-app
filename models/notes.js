'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.notes.belongsTo(models.jobs)
      models.notes.belongsTo(models.charid)
    }
  };
  Notes.init({
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Notes',
  });
  return Notes;
};