const mongoose = require('mongoose');

const Techentry = require('../models/tech-entry');
const Device = require('../models/device');
const Customer = require('../models/customer');

const dashboardController = require('./dashboard/dashboard');

exports.get_all_techentries_api = async (req, res, next) => {
  try {
    const filter = req.query.listFilter;
    const currentPage = +req.query.page;
    const pageSize = +req.query.pagesize;

    const userId = req.userData._id;

    let entryQuery;
    let totalEntries = 0;

    if (filter === 'AllEntries') {
      entryQuery = Techentry.find({user: userId})

      totalEntries = await Techentry.countDocuments({user: userId}).exec();
    } else if (filter === 'TodaysEntries') {

      const currentDate = new Date();
      currentDate.setUTCHours(0,0,0);

      entryQuery = Techentry.find({user: userId, createdAt:
        {'$gte': currentDate.toISOString()}});

      totalEntries = await Techentry.countDocuments({user: userId, createdAt:
        {'$gte': currentDate.toISOString()}}).exec();

    }

    entryQuery
      .select('_id device user customer status')
      .populate('device', 'deviceId deviceName deviceType deviceSn description')
      .populate('customer', 'customerName email company department location')
      .skip(pageSize * (currentPage))
      .limit(pageSize);

    const result = await entryQuery.exec();



    res.status(200).json({
      entries: result.map(te => {
        return {
          id: te._id,
          device: {
            id: te.device._id,
            deviceId: te.device.deviceId,
            deviceName: te.device.deviceName,
            deviceType: te.device.deviceType,
            deviceSn: te.device.deviceSn,
            description: te.device.description
          },
          customer: {
            id: te.customer._id,
            customerName: te.customer.customerName,
            email: te.customer.email,
            company: te.customer.company,
            department: te.customer.department,
            location: te.customer.location
          },
          user: te.user,
          status: te.status
        };
      }),
      totalEntries: totalEntries
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500, message: 'Entry List Retrieval Failed'});
  }
};


exports.get_techentry_api = async (req, res, next) => {
  try {
    const entryId = req.params.techentryId;

    const entry = await Techentry.findById(entryId)
    .select('_id device user customer status')
    .populate('device', 'deviceId deviceName deviceType deviceSn description')
    .populate('customer', 'customerName email company department location')
    .exec();

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
          userId: entry.user,
          status: entry.status
      }
    });

  } catch (error) {
    res.status(500).json({message: 'Entry Retrieval Failed', status: 500});
  }
};

exports.create_techentry_api =  async (req, res, next) => {
  try {
    const userId = req.userData._id;
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

    const updateResult = await Promise.all([
      techEntry.save(),
      customer.save(),
      device.save()
    ]);

    const entryResult = updateResult[0];

    dashboardController
    .update_dashboard_techentries_status(userId, null, '$create');

    dashboardController.update_entry_plot(userId, entryResult.status,
      entryResult.createdAt, '$create');

    const totalEntries = await Techentry.countDocuments({user: userId}).exec();

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
        userId: req.userData._id,
        status: entryResult.status
      },
      totalEntries: totalEntries
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500,
      message: 'Creating Entry Failed'});
  }
}

exports.edit_techentry_api = async (req, res, next) => {
  try {
    const entryId = req.params.techentryId;
    const techentry = await Techentry.findById(entryId)
    .exec();
    if (!techentry || typeof techentry === 'undefined') {
      throw new Error();
    }
    const oldStatus = techentry.status;
    const userId = req.userData._id;
    const operation = req.query.operationCause;

    if (operation === 'infoUpdate') {
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




      await Promise.all([
        Customer.updateOne({_id: customer._id}, customer),
        Device.updateOne({_id: device._id}, device)
      ]);

    } else if (operation === 'statusUpdate') {
      await Techentry.updateOne({_id: entryId}, {$set: {status: req.body.status}});

      if (oldStatus === 'PENDING' && req.body.status === 'COMPLETE') {
         dashboardController
        .update_dashboard_techentries_status(userId, null, '$edit');
         dashboardController
        .update_dashboard_monthly_reached(userId, techentry.createdAt,
          req.body.status, '$edit');
         dashboardController.update_entry_plot(userId, req.body.status,
          techentry.createdAt, '$edit');
      }
    }



    res.status(200).json({message: 'updated successfully'});

  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500,
      message: 'Editing Entry Failed'});
  }
};


exports.delete_entry_api = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const entryId = req.params.techentryId;
    const techEntry = await Techentry.findById(entryId).exec();

    await Promise.all([
      Techentry.remove({_id: entryId}).exec(),
      Customer.remove({_id: techEntry.customer}).exec(),
      Device.remove({_id: techEntry.device}).exec()
    ]);
    dashboardController
    .update_dashboard_techentries_status(userId, techEntry.status, '$delete');
    dashboardController
    .update_dashboard_monthly_reached(userId, techEntry.createdAt,
      techEntry.status, '$delete');
    dashboardController
    .update_entry_plot(userId, techEntry.status, techEntry.createdAt, '$delete');

    const totalEntries = await Techentry.countDocuments({user: userId}).exec();

    res.status(200).json({message: 'Deleted Successfully',
     totalEntries: totalEntries});

  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500,
      message: 'Deleting Failed'});
  }
};
