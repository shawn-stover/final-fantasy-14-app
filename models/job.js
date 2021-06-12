'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.job.hasMany(models.job_note)
    }
  };
  job.init({
    JobName: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'job',
  });
  return job;
};