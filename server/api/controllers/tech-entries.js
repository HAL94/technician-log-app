const mongoose = require('mongoose');

const Techentry = require('../models/tech-entry');
const Device = require('../models/device');
const Customer = require('../models/customer');

exports.get_all_techentries = (req, res, next) => {
  const userId = req.userData._id;
  Techentry.find({user: userId})
    .select('_id device user customer')
    .populate('device', 'deviceId deviceName deviceType deviceSn description')
    .populate('customer', 'customerName email company department location')
    .exec()
    .then(result => {
      res.status(200).json({
        entries: result
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
};

exports.get_todays_entries = (Req, res, next) => {
  const currentDate = new Date();
  currentDate.setUTCHours(0,0,0);
  // const endDate = new Date(new Date().getTime());
  // currentDate.setUTCHours(23,59,59,999);

  // console.log(currentDate.toISOString() + ' : ' + endDate.toISOString());
  // console.log(currentDate.toLocaleTimeString() + ' : ' + endDate.toLocaleTimeString());

  Techentry.find({createdAt: {'$gte': currentDate.toISOString()}})
    .select('_id device user customer')
    .populate('device', 'deviceId deviceName deviceType deviceSn description')
    .populate('customer', 'customerName email company department location')
    .exec()
    .then(result => {
      res.status(200).json({
        entries: result
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
};
exports.get_techentry = (req, res, next) => {
  console.log(req.params);
  const id = req.params.techentryId;
  Techentry.findById(id)
    .select('_id device user customer')
    .populate('device', 'deviceId deviceName deviceType deviceSn description')
    .populate('customer', 'customerName email company department location')
    .exec()
    .then(entry => {
      res.status(200).json({
        techentry: {
          id: entry._id,
          device: {
             id: entry.device._id,
             deviceId: entry.device.deviceId,
             deviceName: entry.device.deviceName,
             deviceType: entry.device.deviceType,
             deviceSn: entry.device.deviceSn,
             description: entry.device.description
          },
          customer: {
            id: entry.customer._id,
            customerName: entry.customer.customerName,
            email: entry.customer.email,
            company: entry.customer.company,
            department: entry.customer.department,
            location: entry.customer.location
          },
          userId: entry.user
        }
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
};

exports.create_techentry =  (req, res, next) => {
  const techEntry = new Techentry({
    _id: new mongoose.Types.ObjectId(),
    device: req.body.device,
    user: req.body.user,
    customer: req.body.customer
  });

  techEntry.save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.create_techentry_api =  (req, res, next) => {
  console.log(req.body);
  const device = new Device({
    _id: new mongoose.Types.ObjectId(),
    deviceId: new mongoose.Types.ObjectId(),
    deviceName: req.body.device.deviceName,
    deviceType: req.body.device.deviceType,
    deviceSn: req.body.device.deviceSn,
    description: req.body.device.description
  });
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    customerName: req.body.customer.customerName,
    email: req.body.customer.email,
    company: req.body.customer.company,
    department: req.body.customer.department,
    location: req.body.customer.location
  });
  const techEntry = new Techentry({
    _id: new mongoose.Types.ObjectId(),
    device: device._id,
    user: req.userData._id,
    customer: customer._id
  });

  device.save()
    .then(() => {
      return customer.save()
    })
    .then(() => {
      return techEntry.save()
    })
    .then(result => {
      console.log(result);
      if (result) {
        return res.status(200).json({
          entry: {
            id: techEntry._id,
            device: {
               id: device._id,
               deviceName: device.deviceName,
               deviceType: device.deviceType,
               deviceSn: device.deviceSn,
               description: device.description
            },
            customer: {
              id: customer._id,
              name: customer.customerName,
              email: customer.email,
              company: customer.company,
              department: customer.department
            },
            userId: req.userData._id
          }
        });
      }

      return res.status(500).json({
        error: 'operation failed'
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    })
}

exports.edit_techentry = (req, res, next) => {
  const techentryId = req.params.techentryId;

  console.log(req.body);
  const device = new Device({
    _id: req.body.device.id,
    deviceId: req.body.device.deviceId,
    deviceName: req.body.device.deviceName,
    deviceType: req.body.device.deviceType,
    deviceSn: req.body.device.deviceSn,
    description: req.body.device.description
  });

  const customer = new Customer({
    _id: req.body.customer.id,
    customerName: req.body.customer.customerName,
    email: req.body.customer.email,
    company: req.body.customer.company,
    department: req.body.customer.department,
    location: req.body.customer.location
  });

  Techentry.findOne({_id: techentryId})
    .exec()
    .then(techEntry => {
      console.log(techEntry._id);
      if (techEntry) {
        return Device.updateOne({_id: device._id}, device);
      } else {
        return res.status(500).json({
          message: 'unsuccessful operation'
        })
      }
    })
    .then(deviceUpdateRes => {
      console.log(deviceUpdateRes);
      if (deviceUpdateRes) {
        return Customer.updateOne({_id: customer._id}, customer);
      }
    })
    .then(customerUpdateRes => {
      console.log(customerUpdateRes);
      if (customerUpdateRes){
        res.status(200).json({
          message: 'updated successfully'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};


exports.delete_entry = (req, res, next) => {
  const id = req.params.techentryId;
  Techentry.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: result
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};
