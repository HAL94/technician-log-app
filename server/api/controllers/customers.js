const mongoose = require('mongoose');
const Customer = require('../models/customer');

exports.get_all_customers = (req, res, next) => {
  Customer.find()
    .exec()
    .then(customers => {
      res.status(200).json({
        customers: customers
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};

exports.get_customer = (req, res, next) => {
  const id = req.params.customerId;
  Customer.findById(id)
    .exec()
    .then(customer => {
      if (!customer)
      {
        return res.status(404).json({
          message: 'customer not found'
        });
      }
      res.status(200).json({
        fetchedCustomer: customer
      })
    })
    .catch(error => {
      res.status(200).json({
        error: error
      })
    })
};

exports.create_customer = (req, res, next) => {
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    customerName: req.body.customerName,
    email: req.body.email,
    company: req.body.company,
    department: req.body.department
  });

  customer.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};

exports.delete_customer = (req, res, next) => {
  const id = req.params.customerId;
  Customer.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    });
};

exports.edit_customer = (req, res, next) => {
  const operations = {};
  const id = req.params.customerId;
  for(const ops of req.body) {
    operations[ops.propName] = ops.value;
  }
  Customer.update({_id: id}, {$set: operations})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};
