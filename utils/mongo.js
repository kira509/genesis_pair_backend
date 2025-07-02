import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Connected to MongoDB'))
  .catch(err => console.error('🔴 MongoDB connection error:', err))

const PairSchema = new mongoose.Schema({
  number: String,
  code: String,
  createdAt: { type: Date, default: Date.now }
})

const Pair = mongoose.model('Pair', PairSchema)

export async function savePairCode(number, code) {
  const newPair = new Pair({ number, code })
  await newPair.save()
}

