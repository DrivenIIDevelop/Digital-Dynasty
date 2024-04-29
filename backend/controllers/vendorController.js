const Vendor = require('../models/vendor');

// list all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const vendor = new Vendor({ name, email, phone });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// get vendor details
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendor_id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// update vendor details
exports.updateVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const vendor = await Vendor.findByIdAndUpdate(req.params.vendor_id, { name, email, phone }, { new: true });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.vendor_id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
