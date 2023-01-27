const Product = require("../models/product");
const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(500).json({ message:"The product with given id was not found" });
  }
  res.status(200).send(product);
});

router.put(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      brands: req.body.brands,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    },
    {new:true}
  );
  if (!product) {
    res.status(500).json({ message:"The product cant be created" });
  }
  res.status(200).send(product);
});

router.delete(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    res.status(500).json({ message:"The product cant be deleted" });
  }
  res.status(200).send(product);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  let product = new Product({
    // id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    brands: req.body.brands,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  if (!product) return res.status(400).send("the category cannot be created!");
  res.send({ msg: "Products has been added", data: product });
});

module.exports = router;

// {
//   "name":"Milk",
//   "description":"Gold",
//   "richDescription":"Amul Gold",
//   "brand":"Amul",
//   "price":32,
//   "category":"63c9291675a39da045548a8c",
//   "countInStock":100,
//   "rating":4,
//   "numReviews":5,
//   "isFeatured":true
// }
