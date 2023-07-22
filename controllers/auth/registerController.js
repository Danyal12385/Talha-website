const User = require('../../models/userModel');
const bcrypt = require('bcrypt');

const register = async (request, response) => {
    const { name, email, password, role } = request.body;

    try {
      const userExist = await User.findOne({email: email});

      if(userExist)
        return response.status(200).json({ success: false, message: 'Email is already with an account.' })

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, email, password: hashedPassword, role });
  
      await newUser.save();
      
      return response.status(200).json({ success: true, message: 'User successfully saved.' });

    } catch (error) {
      
      return response.status(500).json({ success: false, message: error.toString() });
    }
  };
  
  module.exports = { register };