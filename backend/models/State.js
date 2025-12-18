import { Schema, model } from 'mongoose'

const State = new Schema({
    state: { type: String, unique: true, required: true }
})

export default model('State', State)