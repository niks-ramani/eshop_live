const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // id: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  richDescription: { type: String, require: true },
  brands: { type: String, require: true },
  price: { type: Number, require: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  countInStock: { type: Number, require: true },
  rating: { type: Number, require: true },
  isFeatured: { type: Boolean, require: true },
  dateCreated: { type: Date, default: Date.now() },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
