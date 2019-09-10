const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  level: {
    type: String,
    default: 'Relax'
  },
  msj:{
    type:String,
    default:''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('message', MessageSchema);
