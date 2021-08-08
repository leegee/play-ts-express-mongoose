import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  year: {          // Assuming we are dealing with historical figures, does this cover all writing?
    required: true,
    type: Number,
    min: -4000,
    max: 2021,    // What would happen is this was new Date().getFullYear() ?
    set: v => new Date(v).getFullYear()
  },

  passionLevel: { // Integer range 1-4
    required: true,
    type: Number,
    min: 1,
    max: 4,
    set: v => Math.round(v),
  },

});

export const Hobby = mongoose.model('Hobby', schema);
