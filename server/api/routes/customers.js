const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/customers');

router.get('/', CustomersController.get_all_customers);

router.get('/:customerId', CustomersController.get_customer);

router.post('/', CustomersController.create_customer);

router.delete('/:customerId', CustomersController.delete_customer);

router.patch('/:customerId', CustomersController.edit_customer)

module.exports = router;
