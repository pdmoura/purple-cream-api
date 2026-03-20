const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },             
  ingredients: { type: String, required: true },      
  price: { type: Number, required: true },            
  image: { type: String, required: true },            
  category: { type: String, default: "Bowl" },        
  calories: { type: Number, default: 0 },             
  available: { type: Boolean, default: true },        
  isVegan: { type: Boolean, default: true }           
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);