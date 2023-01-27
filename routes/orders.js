const Order= require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(500).json({ message:"The order with given id was not found" });
  }
  res.status(200).send(order);
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id,
    {
      orderItems: req.body.orderItems,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user
    },
    {new:true}
  );
  if (!order) {
    res.status(500).json({ message:"The order cant be created" });
  }
  res.status(200).send(order);
});

router.delete(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order) {
    res.status(500).json({ message:"The order cant be deleted" });
  }
  res.status(200).send(order);
});
router.post("/", async (req, res) => {
    let order = new Order({
      // id: req.body.id,
      orderItems: req.body.orderItems,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user
    });
    order = await order.save();
  
    if (!order) return res.status(400).send("the order cannot be created!");
  
    res.send({msg:"Category has been added",data:order});
  });

module.exports =router;


