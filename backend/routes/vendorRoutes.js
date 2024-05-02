const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.post('/', vendorController.createVendor);
router.get('/:vendor_id', vendorController.getVendorById);
router.put('/:vendor_id', vendorController.updateVendor);
router.delete('/:vendor_id', vendorController.deleteVendor);

module.exports = router;
