const Region = require('../models/regionModel');
const User = require('../models/userModel');
const Report = require('../models/reportModel');

const fetchRegions = async (request, response) => {
    try {
        const regions = await Region.find();

        const regionsWithAdmins = [];

        for (const region of regions) {
            const regionalAdmin = await User.findOne({ _id: region.raId });

            const regionWithAdmin = region.toObject();

            regionWithAdmin.admin = regionalAdmin;

            regionsWithAdmins.push(regionWithAdmin);
        }

        return response.status(200).json({ success: true, data: regionsWithAdmins });

    } catch (err) {

        return response.status(500).json({ success: false, message: err.toString() });
    }
}

const getRegion = async (request, response) => {
    const { id } = request.body;

    try {
        const region = await Region.findById(id);

        if (!region) {
            return response.status(404).json({ success: false, message: 'Region not found' });
        }

        const regionalAdmin = await User.findOne({ _id: region.raId });

        const reports = await Report.find({ regionId: id });

        const regionWithAdmin = region.toObject();

        regionWithAdmin.admin = regionalAdmin;
        
        regionWithAdmin.reports = reports;

        return response.status(200).json({ success: true, data: regionWithAdmin });

    } catch (err) {
        
        return response.status(500).json({ success: false, message: err.toString() });
    }
}

const fetchHomeRegion = async (request, response) => {
    try {
        const regions = await Region.find();

        return response.status(200).json({ success: true, data: regions });

    } catch (err) {

        return response.status(500).json({ success: false, message: err.toString() });
    }
}

const addRegion = async (request, response) => {
    const { name, message, phone, email, account, accountType, raId } = request.body;

    const region = new Region({
        name,
        message,
        phone,
        email,
        account,
        accountType,
        raId
    });

    if (request.files.length !== 0) {
        for (let i = 0; i < request.files.length; i++) {
            region[request.files[i].fieldname] = request.files[i].path;
        }
    }

    try {
        await region.save();

        return response.status(200).json({ success: true, message: 'Region successfully added.' });

    } catch (err) {
        return response.status(500).json({ success: false, message: err.toString() });
    }
}

const updateRegion = async (request, response) => {
    const { id, name, message, phone, email, account, accountType, raId } = request.body;

    try {
      const region = await Region.findById(id);
  
      if (!region) {
        return response.status(404).json({ success: false, message: 'Region not found' });
      }
  
      region.name = name;
      region.message = message;
      region.phone = phone;
      region.email = email;
      region.account = account;
      region.accountType = accountType;
      region.raId = raId;
  
      if (request.files.length !== 0) {
        for (let i = 0; i < request.files.length; i++) {
          region[request.files[i].fieldname] = request.files[i].path;
        }
      }
  
      await region.save();
  
      return response.status(200).json({ success: true, message: 'Region successfully updated.' });

    } catch (err) {
      
      return response.status(500).json({ success: false, message: err.toString() });
    }
}

const deleteRegion = async (request, response) => {
    const { id } = request.body;

    try {
        const deletedRegion = await Region.findByIdAndDelete(id);

        if (!deletedRegion)
            return response.status(404).json({ success: false, message: 'Region not found.' });


        return response.status(200).json({ success: true, message: 'Region deleted successfully.' });

    } catch (err) {

        return response.status(500).json({ success: false, message: err.toString() });
    }
}

module.exports = { fetchRegions, getRegion, fetchHomeRegion, addRegion, updateRegion, deleteRegion };
