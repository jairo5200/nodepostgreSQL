const {Model, DataTypes, Sequelize} = require('sequelize');


const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
    },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: true,
    field: 'user_id',
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
};


class Customer extends Model{
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'Orders',
    foreignKey: 'customerId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    }
  }
}


module.exports = {Customer, CUSTOMER_TABLE,CustomerSchema};

