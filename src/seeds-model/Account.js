const mongoose = require('mongoose')

// schema maps to a collection
const Schema = mongoose.Schema

const accountsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  created_at: { type: Number, default: new Date().getTime() }
})

module.exports = mongoose.model('Account', accountsSchema)


