import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(process.env.MONGO_URI)
export const db = client.db('genesisdb')
export const paircodes = db.collection('paircodes')

export async function connectDB() {
  try {
    await client.connect()
    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
  }
}
