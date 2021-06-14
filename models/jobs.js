'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jobs.init({
    charID: DataTypes.INTEGER,
    jobName: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'jobs',
  });
  return jobs;
};