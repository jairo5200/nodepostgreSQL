const {Model, DataTypes, Sequelize} = require('sequelize');


const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id:{
    allownull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allownull:false,
    type: DataTypes.STRING,
  },
  price:{
    allownull:false,
    type: DataTypes.INTEGER,
  },
  description:{
    allownull:false,
    type: DataTypes.TEXT,
  },
  image:{
    allownull:false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    allowNull: false,
    field: 'category_id',
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
}

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category,{as: 'category'});
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}


module.exports = {PRODUCT_TABLE,ProductSchema,Product}
