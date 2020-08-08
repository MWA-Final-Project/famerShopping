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
    console.log(address)
  
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