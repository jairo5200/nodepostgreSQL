const {Model, DataTypes, Sequelize} = require('sequelize');


const ORDER_TABLE = 'orders';
const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  customerId:{
    type: DataTypes.INTEGER,
    field: 'customer_id',
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    },
  createdAt: {
    allownull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  total:{
    type: DataTypes.VIRTUAL,
    get(){
      if (this.items.length > 0){
        return this.items.reduce((total,item)=>{
          return total + (item.price * item.OrderProduct.amount);
        },0);
      }
      return 0;
    }
  },
}


class Order extends Model{
  static associate(models){
    this.belongsTo(models.Customer,{
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = {Order, OrderSchema, ORDER_TABLE};
