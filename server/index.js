import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({ origin: '*', credentials: true }))
const port = 3000

import { Product, Cart, sequelize } from './db.js'

app.get('/getProducts', async (req, res) => {
  const product = await Product.findAll()
  res.send(product.map(i => ({ ...i.dataValues, count: 0 })))
})

app.post('/addToCart', async (req, res) => {
  const { productId, userId } = req.body
  await Cart.create({ product_id: productId, user_id: userId, count: 1 })
  res.send('Успех')
})

app.get('/getCart', async (req, res) => {
  const { userId } = req.query
  const items = await Cart.findAll({
    where: { user_id: userId },
    include: [{ model: Product, as: 'product' }],
  })
  res.send(items.map(i => ({ ...i.product.dataValues, count: i.count })))
})

app.get('/buy', async (req, res) => {
  const { userId } = req.query
  Cart.destroy({ where: { user_id: userId } })
  res.send('Успех')
})

app.post('/increaseCount', async (req, res) => {
  const { userId, productId } = req.query
  await Cart.increment('count', {
    where: { user_id: userId, product_id: productId },
  })
  res.send('Успех')
})

app.post('/decreaseCount', async (req, res) => {
  const { userId, productId } = req.query
  await Cart.decrement('count', {
    where: { user_id: userId, product_id: productId },
  })
  res.send('Успех')
})

app.post('/deleteOneProduct', async (req, res) => {
  const { userId, productId } = req.query
  await Cart.destroy({ where: { user_id: userId, product_id: productId } })
  res.send('Успех')
})

app.post('/editProduct', async (req, res) => {
  const { productId } = req.query
  const { item } = req.body
  console.log(productId)
  console.log(item)

  await Product.update(item, {
    where: { id: productId },
  })

  res.send('Успех')
})

app.listen(port, () => console.log(`http://localhost:${port}`))
