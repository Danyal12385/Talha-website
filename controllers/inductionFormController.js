const Induction = require('../models/inductionModel');

const addInduction = async (req, res) => {
    try {
        const { name, cnic, phone, region, address } = req.body;
    
        const newInduction = new Induction({
          name,
          cnic,
          phone,
          region,
          address
        });
    
        await newInduction.save();
    
        return res.status(200).json({ success: true, message: 'Your request has been successfully submitted.' });

      } catch (error) {
        
        return res.status(500).json({ success: false, message: error.toString() });
      }
}

module.exports = { addInduction }