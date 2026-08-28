const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    originalPrice: {
      type: Number,
      default: null, // sale wale product ke liye purani price
    },
    category: {
      type: String,
      required: true, // e.g. "Kurti", "Abaya", "Shalwar Kameez"
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // jaise 4.5, 3.8, 5 - star rating ke liye
    },
    reviews: {
      type: Number,
      default: 0, // reviews ki total count, jaise 124
    },
  },
  { timestamps: true }, // createdAt aur updatedAt khud add ho jayenge
);

module.exports = mongoose.model("Product", productSchema);
