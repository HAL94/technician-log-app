const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log(req.body);
  User.find({email: req.body.email})
    .exec()
    .then(users => {
      if (users.length == 0)
      {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: error
            });
          }
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            fname: req.body.fname,
            lname: req.body.lname,
            badgeNumber: req.body.badgeNumber,
            birthDate: req.body.birthDate
          });
          user.save()
            .then(result => {
              console.log(result);
              res.status(200).json(result);
            })
            .catch(error => {
              res.status(500).json({
                error: error
              })
            })
        })
      } else {
        res.status(409).json({
          message: 'user already exists'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })

};

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email })
    .exec()
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: 'authentication failed'
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(err);
        console.log(result);
        if (err)
        {
          return res.status(401).json({
            message: 'authentication failed'
          })
        }

        if (result)
        {
          const token = jwt.sign({
            email: user.email,
            _id: user._id
          }, process.env.JWTKEY, {
            expiresIn: '1h'
          });

          return res.status(200).json({
            message: 'login successfully',
            token: token,
            expiresIn: 3600,
            id: user._id,
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            badgeNumber: user.badgeNumber,
            birthDate: user.birthDate
          })
        }
        // const error = new ErrorEvent('Authentication failed');
        res.status(401).json({
          message: 'authentication failed'
        });
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    })
};

