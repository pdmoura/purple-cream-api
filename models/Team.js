const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },             
  title: { type: String, required: true },            
  description: { type: String, required: true },      
  image: { type: String, required: true },            
  role: {                                             
    type: String, 
    enum: ['Founder', 'Management', 'Staff'], 
    default: 'Staff' 
  },
  email: { type: String, required: true },                                     
  hobbies: { type: [String], default: [] }            
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);