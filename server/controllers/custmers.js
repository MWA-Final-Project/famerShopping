const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Formidable = require('formidable');

const config = require('./../config/config.json');
const Custmer = require("../model/custmers");
const Farmer = require("../model/farmers");
const { findOneAndRemove } = require("../model/custmers");

var BCRYPT_SALT_ROUNDS = 12;

let token;

module.exports.signin = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let custmerAccount;

    await Custmer.findOne({ email: email })
        .then(acct => {
            if (!acct) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            custmerAccount = acct;
            return bcrypt.compare(password, custmerAccount.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({ message: "Unsuccessful login attempt" });
            }

            token = jwt.sign({ email: custmerAccount.email, id: custmerAccount._id },
                config.secretKey, { expiresIn: "1h" }
            );

            res.status(200).json({ token: token, role: "custmer", id: custmerAccount._id, email: custmerAccount.email, fullName: custmerAccount.fullName, firstName: custmerAccount.fullName.firstName, lastName: custmerAccount.fullName.lastName });
        })
        .catch(err => res.status(400).json({ message: err }));
}
/////////




module.exports.signup = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = {
        firstName: req.body.fullName.fisrtName,
        lastName: req.body.fullName.lastName
    };
    const phone = req.body.phone;
    const address = {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipcode: req.body.address.zipcode
    }


    await bcrypt
        .hash(password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
            const newCustmer = {
                email: email,
                password: hashedPassword,
                fullName: fullName,
                phone: phone,
                address: address,
                odrders: []
            };
            const custmer = new Custmer(newCustmer);

            custmer
                .save()
                .then(_ => {
                    res.status(200).json({ message: "the custmer successfully created." });
                })
                .catch(err => {
                    res.status(400).json({ message: err });
                });
        })
        .catch(err => res.status(400).json({ message: err }));
}

module.exports.getAllCustomers = async(req, res) => {
    await Custmer.find({}, { password: 0 })
        .then(customers => res.status(200).json(customers))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllOrders = async(req, res) => {
    const customerId = req.params.custId;

    await Custmer.findOne({ _id: customerId }, { _id: 0, fullName: 1, orders: 1 })
        .then(orders => res.status(200).json(orders))
        .catch(err => req.status(400).json(err))
}

module.exports.addOrder = async(req, res) => {
    const customerId = req.params.custId;
    const order = req.body;

    await Custmer.findOne({ _id: customerId })
        .then(customer => {
            customer.orders.push(order);

            customer.save().then(_ => {
                    res.status(200).json({ message: 'Order successfully added.' }); // farmer
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}

module.exports.getCustomerCart = async(req, res) => {
    const customerId = req.params.custId;

    await Custmer.findOne({ _id: customerId }, { _id: 0, cart: 1 })
        .then(orders => res.status(200).json(orders))
        .catch(err => req.status(400).json(err))
}

module.exports.addToCart = async(req, res) => {
    const customerId = req.params.custId;
    const productId = req.params.productId;
    const quantity = 1; // req.params.quantity

    await Farmer.findOne({ "products._id": productId})
                .then(farmer => {

                  const farmerId = farmer._id;

                  Custmer.findOne({ _id: customerId })
                    .then(customer => {
                      const cart = customer.cart;
                      let exists = false;

                      const price = farmer.products.filter(prod => prod._id == productId).map(prod => prod.price)[0];

                      for(let i = 0; i < cart.length; i++){
                        if(cart[i].productId == productId){
                          exists = true;
                          cart[i].quantity += quantity;
                          cart[i].totalPrice += price;
                        }
                      }

                      if(!exists){
                        
                        const order = {
                          "oderdingDate": Date(Date.now()),
                          "deliveryDate": Date().toString(),
                          "farmerId": farmerId,
                          "productId": productId,
                          "status": "Pending",
                          "price": price,
                          "quantity": quantity,
                          "totalPrice": price * quantity,
                          "paidStatus": "Pending",
                          "ratedStatus": false
                        }

                        cart.push(order);
                      }
                        

                      customer.save().then(_ => {
                              res.status(200).json({ message: 'Order added to cart successfully.' });
                          })
                          .catch(err => res.status(400).json(err))
                    })
                    .catch(err => res.status(400).json(err))
                })
                .catch(err => resp.status(200).json(err))    
}

module.exports.removeFromCart = async(req, res) => {
    const customerId = req.params.custId;
    const orderId = req.params.orderId;

    await Custmer.updateOne({ _id: customerId }, { $pull: { cart: { _id: orderId } } })
        .then(_ => res.status(200).json({ message: "Order removed successfully." }))
        .catch(err => res.status(400).json(err))
}

module.exports.checkout = async(req, res) => {
    const customerId = req.params.custId;
    let cart;

    await Custmer.findOne({ _id: customerId })
        .then(customer => {
            cart = customer.cart;

            let gotFarmer = false;
            let farmerId;
            let productId;
            let quantity;
            let products;
            
            cart.forEach(order => {

              if(!this.gotFarmer){                
                this.farmerId = order.farmerId;
                this.gotFarmer = true;
              }

              customer.orders.push(order)
            });
            
            Farmer.findOne({ _id: this.farmerId })
                  .then(farmer => {
                    this.products = farmer.products;
                    
                    cart.forEach(order => {
                      this.productId = order.productId;
                      this.quantity = order.quantity;

                      for(let i = 0; i < this.products.length; i++){
                        if(this.products[i]._id == this.productId){
                          this.products[i].quantity -= this.quantity;
                        }
                      }
                      
                      farmer.orders.push(order)
                    });

                    farmer.save()
                          .then(_ => {
                            customer.cart = [];

                            customer.save()
                                .then(_ => {
                                  res.status(200).json({ message: "Order successfully placed." })
                                })
                                .catch(err => res.status(400).json(err))
                          })
                          .catch(err => res.status(400).json(err))
                  })
                  .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}

module.exports.cancelOrder = async(req, res) => {
    const customerId = req.params.custId;
    const orderId = req.params.orderId;

    await Custmer.updateOne({ _id: customerId }, { $pull: { orders: { _id: orderId } } })
        .then(_ => res.status(200).json({ message: "Order removed successfully." }))
        .catch(err => res.status(400).json(err))
}

module.exports.rateFarmer = async(req, res) => {
  const customerId = req.params.custId;
  const orderId = req.params.orderId;
  const rating = parseInt(req.params.rating);

  await Custmer.findOne({ _id: customerId})
                .then(customer => {
                  const orders = customer.orders;

                  for(let i = 0; i < orders.length; i++){
                    if(orders[i]._id == orderId){
                      const farmerId = orders[i].farmerId;

                      Farmer.updateOne({ _id: farmerId }, { $inc: { rate: rating } })
                            .then(_ => {
                              orders[i].ratedStatus = true;

                              customer.save()
                                  .then(_ => res.status(200).json({ message: "Farmer rated successfully." }))
                                  .catch(err => res.status(400).json(err))
                            })
                            .catch(err => res.status(400).json(err));                        
                    }
                  }
                })
                .catch(err => res.status(400).json(err));
}

module.exports.incCartOrderQuantity = async(req, res) => {
    const customerId = req.params.custId;
    const orderId = req.params.orderId;
    const price = parseFloat(req.body.price);

    await Custmer.updateOne({ _id: customerId, "cart._id": orderId }, { $inc: { "cart.$.quantity": 1, "cart.$.totalPrice": price }})
        .then(_ => res.status(200).json({ message: "Quantity updated successfully." }))
        .catch(err => res.status(400).json(err))
}

module.exports.decCartOrderQuantity = async(req, res) => {
    const customerId = req.params.custId;
    const orderId = req.params.orderId;
    const price = parseFloat(req.body.price);

    await Custmer.updateOne({ _id: customerId, "cart._id": orderId }, { $inc: { "cart.$.quantity": -1, "cart.$.totalPrice": -price } })
        .then(_ => res.status(200).json({ message: "Quantity updated successfully." }))
        .catch(err => res.status(400).json(err))
}