const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // id: { type: String, required: true },
    orderItems: {type: mongoose.Schema.Types.ObjectId,ref:"Orderitems", required: true },
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
    status: { type: String, required: true,default:"Pending" },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId,ref:"User" },
    dateOrdered: { type: Date, default: Date.now() }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

// order erxample

// {"orderItems": [{
//     "quantity":3,
//     "product":"product id"
// },{
//     "quantity":3,
//     "product":"product id"
// }],
//     "shippingAddress1": "surat",
//     "shippingAddress2": "surat",
//     "city": "surat",
//     "zip": 395001,
//     "country": "india",
//     "phone": 7698957857,
//     "user": "userid"
  
// }