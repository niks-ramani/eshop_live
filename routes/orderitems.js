const  Orderitems = require("../models/orderitem");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderitem = await Orderitems.find();
  
  if (!orderitem) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderitem);
});

router.get(`/:id`, async (req, res) => {
  const orderitem = await Orderitems.findById(req.params.id);
  
  if (!orderitem) {
    res.status(500).json({ message:"The orderitem with given id was not found" });
  }
  res.status(200).send(orderitem);
});

router.put(`/:id`, async (req, res) => {
  const orderitem = await Orderitems.findByIdAndUpdate(req.params.id,
    {
      product: req.body.product,
      quantity: req.body.quantity
    },
    {new:true}
  );
  if (!orderitem) {
    res.status(500).json({ message:"The orderitem cant be created" });
  }
  res.status(200).send(orderitem);
});

router.delete(`/:id`, async (req, res) => {
  const orderitem = await Orderitems.findByIdAndRemove(req.params.id);
  if (!orderitem) {
    res.status(500).json({ message:"The orderitem cant be deleted" });
  }
  res.status(200).send(orderitem);
});


router.post("/", async (req, res) => {
  let orderitem = new Orderitems({
    // id: req.body.id,
    product: req.body.product,
    quantity: req.body.quantity,
  });
  orderitem = await orderitem.save();

  if (!orderitem) return res.status(400).send("the orderitem cannot be created!");

  res.send({msg:"Category has been added",data:orderitem});
});

module.exports = router;