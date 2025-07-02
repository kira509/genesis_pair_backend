import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { savePairCode } from './utils/mongo.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Save pair code API
app.post('/api/pair', async (req, res) => {
  const { number, code } = req.body
  if (!number || !code) {
    return res.status(400).json({ error: 'Missing number or code' })
  }

  try {
    await savePairCode(number, code)
    res.status(200).json({ message: 'Pair code saved successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
})

const PORT = process.env.PORT || 10000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

