const mongoose = require("mongoose");
const validator = require("validator");

const Account = mongoose.model("custmer", {
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error("Error: Invalid email address");
    }
  },
  password: {
    type: String,
    required: true
  },fullName: {
    firstName: {type:String, required: true},
    lastName: {type:String, required: true}
  },address:{
    street: {type:String, required: true},
    city: {type:String, required: true},
    state: {type:String, required: true},
    zipcode: {type:String, required: true}
  },phone:{
    type:String, 
    required: true
  },orders:[{
    oderdingDate: {type:String, required: true},
    deliveryDate: {type:String, required: true},
    farmerId: {type:String, required: true},
    productId: {type:String, required: true},
    status: {type:String, required: true},
    price: {type:Number, required: true},
    quantity: {type:Number, required: true},
    totalPrice: {type:Number, required: true},
    paidStatus: {type:String, required: true},
    ratedStatus: {type:Boolean, required: true}
  }],
  cart: [
    {
      oderdingDate: {type:String, required: true},
      deliveryDate: {type:String, required: true},
      farmerId: {type:String, required: true},
      productId: {type:String, required: true},
      status: {type:String, required: true},
      price: {type:Number, required: true},
      quantity: {type:Number, required: true},
      totalPrice: {type:Number, required: true},
      paidStatus: {type:String, required: true},
      ratedStatus: {type:Boolean, required: true}
    }
  ]
});

module.exports = Account;