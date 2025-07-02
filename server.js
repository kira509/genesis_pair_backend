import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, paircodes } from './utils/mongo.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Genesis Pair Backend Live 🚀')
})

app.post('/pair', async (req, res) => {
  const { phone } = req.body
  if (!phone) return res.status(400).json({ error: 'Missing phone number' })

  const code = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  const entry = { phone, code, createdAt: new Date() }

  try {
    await paircodes.insertOne(entry)
    res.json({ code })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save pair code' })
  }
})

app.listen(PORT, async () => {
  await connectDB()
  console.log(`🌐 Server running on http://localhost:${PORT}`)
})
