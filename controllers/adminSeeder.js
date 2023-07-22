const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const adminSeeder = async (request, response) => {
    try {
      const adminUser = await User.findOne({ role: 'admin' });
  
      if (adminUser) {
        return response.status(200).json({ success: true, message: 'Admin user already exists.' });
      } else {
        const hashedPassword = await bcrypt.hash('admin', 10);
        
        const newUser = new User({
          name: 'admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          role: 'admin'
        });
  
        await newUser.save();
  
        return response.status(200).json({ success: true, message: 'Admin user successfully added.' });
      }
    } catch (error) {
      return response.status(500).json({ success: false, message: error.toString() });
    }
  };
  
  module.exports = { adminSeeder };