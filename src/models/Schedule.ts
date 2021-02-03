export {}

import * as mongoose from 'mongoose'

export interface ISchedule extends mongoose.Document {
  account_id?: string;
  start_time: number;
  end_time: number;
  notes: string;
  deleted_on: number;
  shift_type: string;
  created_at: number;
}

const ScheduleSchema: mongoose.Schema = new mongoose.Schema({
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  start_time: { type: Number, required: true },
  end_time: { type: Number, required: true },
  notes: { type: String },
  deleted_on: { type: Number, default: 0 },
  shift_type: { type: String, enum: ['general', 'published'], default: 'general' },
  created_at: { type: Number, default: new Date().getTime() }
})

module.exports = mongoose.model<ISchedule>('Schedule', ScheduleSchema)

