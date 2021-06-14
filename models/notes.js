'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.notes.belongsTo(models.character)
      models.notes.belomgsToMany(models.jobs, { through: 'jobs_notes'})
    }
  };
  notes.init({
    note: DataTypes.TEXT,
    charID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};