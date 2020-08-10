const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require('./../config/config.json');
const Farmer = require("../model/farmers");

var BCRYPT_SALT_ROUNDS = 12;

let token;

module.exports.signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let farmerAccount;
  
    await Farmer.findOne({ email: email })
                .then(acct => {
                  if (!acct) {
                    return res.status(401).json({ message: "Authentication failed" });
                  }
            
                  farmerAccount = acct;
                  return bcrypt.compare(password, farmerAccount.password);
                })
                .then(result => {
                  if (!result) {  
                    return res.json({ message: "Unsuccessful login attempt" });
                  }
            
                  token = jwt.sign(
                    { email: farmerAccount.email, id: farmerAccount._id },
                    config.secretKey,
                    { expiresIn: "1h" }
                  );
            
                  res.status(200).json({ token: token });
              })
              .catch(err => res.json({ message: err }));
}

module.exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = {
    firstName: req.body.fullName.fisrtName, 
    lastName:req.body.fullName.lastName
  };
  const phone = req.body.phone;
  const address = { 
    street: req.body.address.street, 
    city : req.body.address.city,
    state: req.body.address.state,
    zipcode: req.body.address.zipcode
  }
  console.log(address)

  await bcrypt
    .hash(password, BCRYPT_SALT_ROUNDS)
    .then(hashedPassword => {
      const newFarmer = {  email: email, 
                            password: hashedPassword, 
                            fullName: fullName,
                            address:address,
                            phone : phone,
                            rate:0,
                            products:[],
                            odrders:[]};
      const farmer = new Farmer(newFarmer);

      farmer.save()
            .then(_ => {
              res.json({ message: "the farmer successfully created." });
              })
              .catch(err => {
                console.log({ message: err });
                res.json({ message: err });
              });
    })
    .catch(err => res.json({ message: err }));
}

// Farmer

module.exports.getAllFarmers = async (req, res) => {

  await Farmer.find({ }, { password: 0})
              .sort({rate: -1})
              .then(data => res.json(data))
              .catch(err => res.json(err))
}

module.exports.getFarmerById = async (req, res) => {
  const farmerId = req.params.farmerId;

  await Farmer.findOne({ _id: farmerId })
              .then(data => res.json(data))
              .catch(err => res.json(err))
}

module.exports.rateFarmer = async (req, res) => {
  const farmerId = req.params.farmerId;
  const rating = req.params.rating;

  let ratingValue = 0;

  switch(rating){
    case "Excellent":
      ratingValue = 1;
      break;
    case "Bad":
      ratingValue = -1;
      break;
    default:  // "Good" and the rest
      ratingValue = 0;
  }

  await Farmer.updateOne({ _id: farmerId }, { $inc: { rate: ratingValue }})
              .then(data => res.json({message: "Farmer rated successfully."}))
              .catch(err => res.json(err))
}

// PRODUCTS

module.exports.getAllProducts = async (req, res) => {
  const farmerId = req.params.farmerId;

  await Farmer.findOne({ _id: farmerId }, {_id: 0, email: 1, products: 1})
              .then(data => res.json(data))
              .catch(err => res.json(err))
}

module.exports.addProduct = async (req, res) => {
  const farmerId = req.params.farmerId;
  const product = req.body;

  await Farmer.findOne({ _id: farmerId })
              .then(farmer => {
                farmer.products.push(product)
                
                farmer.save()
                      .then(_ => {
                        res.json({message: 'Product successfully added.'})  // farmer
                      })
                      .catch(err => res.json(err))
              })
              .catch(err => res.json(err))
}

module.exports.removeProduct = async (req, res) => {
  const farmerId = req.params.farmerId;
  const productId = req.params.productId;

  await Farmer.updateOne({ _id: farmerId }, {$pull: {products: {_id: productId}}})
              .then(_ => res.json({message: "Product removed successfully."}))
              .catch(err => res.json(err))
}

module.exports.getAllOrders = async (req, res) => {
  const farmerId = req.params.farmerId;

  await Farmer.findOne({ _id: farmerId }, {_id: 0, email: 1, orders: 1})
              // .sort({"orders.status": -1})
              .then(data => res.json(data))
              .catch(err => res.json(err))
}

module.exports.addOrder = async (req, res) => {
  const farmerId = req.params.farmerId;
  const order = req.body;

  await Farmer.findOne({ _id: farmerId })
              .then(farmer => {
                farmer.orders.push(order);
                
                farmer.save().then(_ => {
                  res.json({message: 'Order successfully added.'});  // farmer
                })
                .catch(err => res.json(err))
              })
              .catch(err => res.json(err))
}

module.exports.updateOrderStatus = async (req, res) => {
  const farmerId = req.params.farmerId;
  const orderId = req.params.orderId;
  const status = req.body.status;

  await Farmer.findOne({ _id: farmerId })
              .then(farmer => {
                // const orders = farmer.orders;

                // orders.forEach(order => {
                //   if (order._id === orderId){
                //     order.status = status;
                //   }
                // })

                for(let i = 0; i < farmer.orders.length; i++){
                  if (farmer.orders[i]._id === orderId){
                    farmer.orders[i].status = status;
                  }
                }
                
                farmer.save().then(_ => {
                  res.json({message: 'Order status changed successfully.'});  // farmer
                })
                .catch(err => res.json(err))
              })
              .catch(err => res.json(err))

  await Farmer.updateOne({ _id: farmerId }, {$pull: {orders: { _id: orderId}}})
              .then(_ => res.json({message: "Order cancelled successfully."}))
              .catch(err => res.json(err))
}

module.exports.cancelOrder = async (req, res) => {
  const farmerId = req.params.farmerId;
  const orderId = req.params.orderId;

  await Farmer.updateOne({ _id: farmerId }, {$pull: {orders: { _id: orderId}}})
              .then(_ => res.json({message: "Order cancelled successfully."}))
              .catch(err => res.json(err))
}