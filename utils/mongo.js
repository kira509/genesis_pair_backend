// utils/mongo.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // .env will hold your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('genesis_db'); // You can change 'genesis_db' to any DB name
  return db;
}

module.exports = connectDB;
