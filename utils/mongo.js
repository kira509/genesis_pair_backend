const mongoose = require('mongoose');

mongoose.connect(''mongodb+srv://cavancinara:oGieKgiloeAs04XR@genesis-cluster.svbkj9v.mongodb.net/?retryWrites=true&w=majority&appName=genesis-cluster'
', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Connected to MongoDB'))
  .catch(err => console.error('🔴 MongoDB connection error:', err));

const PairSchema = new mongoose.Schema({
  number: String,
  code: String,
  createdAt: { type: Date, default: Date.now }
});

const Pair = mongoose.model('Pair', PairSchema);

async function savePairCode(number, code) {
  const newPair = new Pair({ number, code });
  await newPair.save();
}

module.exports = { savePairCode };
