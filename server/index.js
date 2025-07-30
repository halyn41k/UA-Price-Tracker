import express from 'express'
import cors from 'cors'
import { loadDB, saveDB } from './db.js'
import { parseProduct } from './parsers.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

let db = loadDB()

app.get('/api/products', (req, res) => {
  res.json(db.products)
})

app.post('/api/products', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const { name, price } = await parseProduct(url)
    const product = {
      id: Date.now().toString(),
      url,
      name,
      history: [{ price, date: new Date().toISOString() }]
    }
    db.products.push(product)
    saveDB(db)
    res.json(product)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id
  db.products = db.products.filter(p => p.id !== id)
  saveDB(db)
  res.json({ success: true })
})

async function refreshPrices() {
  for (const product of db.products) {
    try {
      const { price } = await parseProduct(product.url)
      product.history.push({ price, date: new Date().toISOString() })
    } catch (e) {
      console.error('refresh failed', product.url, e.message)
    }
  }
  saveDB(db)
}
setInterval(refreshPrices, 24 * 60 * 60 * 1000)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
