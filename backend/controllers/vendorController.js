const Vendor = require('../models/vendor');

// List all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    // Check if vendors exist
    if (vendors.length === 0) {
      return res.status(404).json({ message: 'No vendors found' });
    }

    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create new vendor
exports.createVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if required fields are present
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    // Check if vendor with same email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(409).json({ message: 'Vendor with same email already exists' });
    }

    const vendor = new Vendor({ name, email, phone });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get vendor details by ID
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

// Update vendor details by ID
exports.updateVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if required fields are present
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const vendor = await Vendor.findByIdAndUpdate(req.params.vendor_id, { name, email, phone }, { new: true });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete vendor by ID
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
