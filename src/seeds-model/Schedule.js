const mongoose = require('mongoose')

// schema maps to a collection
const Schema = mongoose.Schema

const schedulesSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, required: true },
  start_time: { type: Number, required: true },
  end_time: { type: Number, required: true },
  notes: { type: String },
  created_at: { type: Number, default: new Date().getTime() }
})

module.exports = mongoose.model('Schedule', schedulesSchema)


