// src/app/lib/models/AnimalProduct.js
import mongoose from "mongoose";

const animalProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const AnimalProduct = mongoose.models.AnimalProduct || mongoose.model("AnimalProduct", animalProductSchema);

export default AnimalProduct;