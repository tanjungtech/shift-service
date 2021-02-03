export {}

import * as mongoose from 'mongoose'

export interface IAccount extends mongoose.Document {
  name: string;
  role: string;
  created_at: number;
}

const AccountSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  created_at: { type: Number, default: new Date().getTime() }
})

module.exports = mongoose.model<IAccount>('Account', AccountSchema)

