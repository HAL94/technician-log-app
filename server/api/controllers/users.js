const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const DashboardController = require('../controllers/dashboard/dashboard');
const fs = require('fs');


exports.signup = async (req, res, next) => {
  try {
    let user = await User.findOne({email: req.body.email}).exec();

    if (user !== null) {
      return res.status(409).json({status: 409, message: 'Account Already Registered'});
    }

    const register = () => {
      return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            reject(err);
          }

          user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            fname: req.body.fname,
            lname: req.body.lname,
            badgeNumber: req.body.badgeNumber,
            birthDate: req.body.birthDate
          });


          user.save()
          .then(() => resolve('Registeration Successful'))
          .catch(error => reject(error));

        });

      });
    }

    const result = await register();

    await DashboardController.set_dashboard(user._id);

    res.status(200).json({message: result});

  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500, message: 'Registeration Failed'});
  }

};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email });

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      console.log(err);
      console.log(result);

      if (err || !result) {
        throw err;
      }

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
        userId: user._id
      });

    });
  } catch (error) {
    console.log(error);
    res.status(401).json({status: 401,
      message: 'Authentication Failed'});
  }

};

exports.get_profile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({_id: userId})
      .select('email fname lname badgeNumber birthDate address city country postalCode aboutUser profileImage createdAt')
      .exec();

    if (!user || typeof user === 'undefined') {
      const error = new Error();
      error.message = 'user not found';
      error.status = 404;
      throw error;
    }
    let imageName = '';
    // console.log(user.profileImage);
    if (user.profileImage) {
      const arr = user.profileImage.split('/');
      imageName = arr[arr.length - 1];
    }

    const filepath = "images/" + imageName;
    fs.access(filepath, fs.F_OK, (err) => {

      if (err) {
        user.profileImage = null;
      }

      res.status(200).json({
        fetchedUser: {
          id: user._id,
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          badgeNumber: user.badgeNumber,
          birthDate: user.birthDate,
          address: user.address,
          city: user.city,
          country: user.country,
          postalCode: user.postalCode,
          aboutUser: user.aboutUser,
          profileImage: user.profileImage,
          createdAt: user.createdAt
        }
      });
    });

  } catch (error) {
    console.log(error);
    res.status(error.status).json({status: error.status,
      message: error.message});
  }
};

exports.update_profile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = new User({
      _id: userId,
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      badgeNumber: req.body.badgeNumber,
      profileImage: req.body.profileImage,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      postalCode: req.body.postalCode,
      aboutUser: req.body.aboutUser,
      birthDate: req.body.birthDate,
      createdAt: req.body.createdAt
    });
    // console.log(user);
    const result = await User.updateOne({_id: userId}, user).exec();

    if (!result || typeof result === 'undefined') {
      const error = new Error();
      error.message = 'user update failed';
      error.status = 500;
      throw error;
    }

    res.status(200).json({
      message: 'update successful',
      fetchedUser: {
        id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        badgeNumber: user.badgeNumber,
        birthDate: user.birthDate,
        address: user.address,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        aboutUser: user.aboutUser,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.log(error);
    res.status(error.status).json({status: error.status,
      message: error.message});
  }

};

exports.upload_profileImg = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const file = req.file;
    const url = req.protocol + '://' + req.get('host');
    const imagePath = url + '/images/' + file.filename;
    console.log(imagePath);
    const result = await User.updateOne({_id: userId}, {$set: {profileImage: imagePath}})
      .exec();

    if (!result || typeof result === 'undefined') {
      const error = new Error()
      error.message = 'could not update';
      error.status = 500;
    }

    console.log(result);

    return res.status(200).json({
      message: 'success',
      profileImage: imagePath
    });

  } catch (error) {
    console.log(error);
    res.status(error.status).json({status: error.status,
      message: error.message});
  }

};
