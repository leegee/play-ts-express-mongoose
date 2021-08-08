const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,

  hobbies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hobby"
    }
  ]
});

export const User = mongoose.model('User', schema);
