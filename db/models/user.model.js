const {Model, DataTypes, Sequelize} = require('sequelize');
const { Customer } = require('./customer.model');

const USER_TABLE = 'users';
const UserSchema = {
  id:{
    allownull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email:{
    allownull:false,
    type: DataTypes.STRING,
    unique: true,
  },
  password:{
    allownull:false,
    type: DataTypes.STRING,
  },
  role:{
    allownull:false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt:{
    allownull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}


class User extends Model{
  static associate(models){
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User};
