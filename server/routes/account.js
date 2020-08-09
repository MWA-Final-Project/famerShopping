const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('./../config/config.json');

const checkAuth = require("../midleware/check-auth");

const Account = require("../model/account");

const router = express.Router();

var BCRYPT_SALT_ROUNDS = 12;

let token;

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let account;

  await Account.findOne({ email: email })
    .then(acct => {
      if (!acct) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      account = acct;
      return bcrypt.compare(password, account.password);
    })
    .then(result => {
      if (!result) {
        console.log({ message: "Unsuccessful log in attempt" });

        return res.json({ message: "Unsuccessful login attempt" });
      }

      token = jwt.sign(
        { email: account.email, id: account._id },
        config.secretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token });
    })
    .catch(err => res.json({ message: err }));
});

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await bcrypt
    .hash(password, BCRYPT_SALT_ROUNDS)
    .then(hashedPassword => {
      const newAccount = { email: email, password: hashedPassword };
      const account = new Account(newAccount);

      account
        .save()
        .then(_ => {
          console.log(newAccount);
          res.json(true );
        })
        .catch(err => {
          console.log({ message: err });
          res.json({ message: err });
        });
    })
    .catch(err => res.json(err));
});

router.get("/api/protected", checkAuth, (req, res, next) => {
  res.json(token);
});
module.exports = router;