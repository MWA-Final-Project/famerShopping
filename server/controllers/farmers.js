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
          console.log({ message: "Unsuccessful log in attempt" });
  
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
    const fullName = {firstName: req.body.fullName.fisrtName, 
                      lastName:req.body.fullName.lastName
                    };
    const phone = req.body.phone;
    const address = { street: req.body.address.street, 
                      city : req.body.address.city,
                      state: req.body.address.state,
                      zipcode: req.body.address.zipcode
                    }
    const rate = req.body.rate;
    console.log(address)
  
    await bcrypt
      .hash(password, BCRYPT_SALT_ROUNDS)
      .then(hashedPassword => {
        const newFarmer = {  email: email, 
                              password: hashedPassword, 
                              fullName: fullName,
                              address:address,
                              phone : phone,
                              rate:rate,
                              products:[],
                              odrders:[]};
        const farmer = new Farmer(newFarmer);
  
        farmer
          .save()
          .then(_ => {
            console.log(newFarmer);
            res.json({ message: "the farmer successfully created." });
          })
          .catch(err => {
            console.log({ message: err });
            res.json({ message: err });
          });
      })
      .catch(err => res.json({ message: err }));
  }