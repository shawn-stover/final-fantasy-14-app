'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs_notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jobs_notes.init({
    jobsId: DataTypes.INTEGER,
    notesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jobs_notes',
  });
  return jobs_notes;
};