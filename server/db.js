import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  'postgres://postgres.qinzkbufqazmlpgescyp:kinzhalov133@aws-0-us-east-1.pooler.supabase.com:5432/postgres'
)

export const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total_count_item: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  country_manufacture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  printing_technology: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  print_color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

export const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.TEXT,
  },
  product_id: {
    type: Sequelize.INTEGER,
    references: { model: Product, key: 'id' },
  },
  count: {
    type: Sequelize.INTEGER,
  },
})

Product.hasMany(Cart, { foreignKey: 'product_id' })
Cart.belongsTo(Product, { foreignKey: 'product_id' })
