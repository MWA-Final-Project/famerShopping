const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require('./../config/config.json');
const Custmer = require("../model/custmers");

var BCRYPT_SALT_ROUNDS = 12;

let token;

module.exports.signin = async (req, res) => {
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
          console.log({ message: "Unsuccessful log in attempt" });
  
          return res.json({ message: "Unsuccessful login attempt" });
        }
  
        token = jwt.sign(
          { email: custmerAccount.email, id: custmerAccount._id },
          config.secretKey,
          { expiresIn: "1h" }
        );
  
        res.status(200).json({ token: token });
      })
      .catch(err => res.json({ message: err }));
}

module.exports.signup = async (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  const fullName = {firstName: req.body.fullName.fisrtName, 
                    lastName:req.body.fullName.lastName
                  };
  const phone = req.body.phone;
  const address = { street: req.body.address.street, 
                    city : req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode
                  }
  

  await bcrypt
    .hash(password, BCRYPT_SALT_ROUNDS)
    .then(hashedPassword => {
      const newCustmer = {  email: email, 
                            password: hashedPassword, 
                            fullName: fullName,
                            phone : phone,
                            address:address,
                            odrders:[] };
      const custmer = new Custmer(newCustmer);

      custmer
        .save()
        .then(_ => {
          console.log(newCustmer);
          res.json({ message: "the custmer successfully created." });
        })
        .catch(err => {
          console.log({ message: err });
          res.json({ message: err });
        });
    })
    .catch(err => res.json({ message: err }));
}

module.exports.getAllCustomers = async (req, res) => {
  await Custmer.find({})
                .then(customers => res.json(customers))
                .catch(err => res.json(err))
}

module.exports.getAllOrders = async (req, res) => {
  const custId = req.params.custId;

  await Custmer.findOne({_id: custId}, {_id: 0, fullName: 1, orders: 1})
              .then(orders => res.json(orders))
              .catch(err => req.json(err))
}

module.exports.getCustomerCart = async (req, res) => {
  const custId = req.params.custId;

  await Custmer.findOne({_id: custId})//, {_id: 0, cart: 1}
              .then(orders => res.json(orders))
              .catch(err => req.json(err))
}

module.exports.addToCart = async (req, res) => {
  const customerId = req.params.custId;
  const order = req.params.order;
console.log("=============================================")
  await Custmer.updateOne({_id: customerId}, {$push: {cart: order}})
              .then(_ => res.json({message: "Order added to cart successfully."}))
              .catch(err => res.json({"err": "error"}))
}

module.exports.removeFromCart = async (req, res) => {
  const customerId = req.params.custId;
  const orderId = req.params.orderId;

  await Custmer.updateOne({_id: customerId}, {$pull: {cart: {_id: orderId}}})
              .then(_ => res.json({message: "Order removed successfully."}))
              .catch(err => res.json(err))
}

module.exports.checkout = async (req, res) => {
const custId = req.params.custId;
  await Custmer.findOne({_id: custId})
              .then(customer => {
                customer.orders.push(customer.cart);
                customer.cart = [];

                customer.save()
                        .then(_ => res.json({message: "Order successfully placed."}))
                        .catch(err => req.json(err))
              })
              .catch(err => req.json(err))
}

module.exports.cancelOrder = async (req, res) => {
  const customerId = req.params.custId;
  const orderId = req.params.orderId;

  await Farmer.updateOne({_id: customerId}, {$pull: {orders: {_id: orderId}}})
              .then(_ => res.json({message: "Order removed successfully."}))
              .catch(err => res.json(err))
}