import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, savePairCode } from './utils/mongo.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

connectDB()

// Sample route
app.post('/api/pair', async (req, res) => {
  const { number, code } = req.body
  if (!number || !code) return res.status(400).json({ error: 'Missing number or code' })
  await savePairCode(number, code)
  res.json({ success: true, message: 'Pair code saved' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
