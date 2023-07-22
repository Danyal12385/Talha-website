const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getRegionalAdmins = async (request, response) => {
  try {
    const users = await User.find();

    return response.status(200).json({ success: true, data: users });

  } catch (error) {
    return response.status(500).json({ success: false, error: error.toString() });
  }
};

const getUserById = async (request, response) => {
  const id = request.body.id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return response.status(200).json({ success: false, message: 'User not found.' });
    }

    return response.status(200).json({ success: true, data: user });
    
  } catch (error) {
    return response.status(500).json({ success: false, message: error.toString() });
  }
}

const updateUser = async (request, response) => {
  const { name, email, id, password, role } = request.body;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return response.status(200).json({ success: false, message: 'User not found.' });
        }

        user.name = name;
        user.email = email;
        user.role = role;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        if (password) {
            return response.status(200).json({ success: true, message: 'User successfully updated with password.' });
        } else {
            return response.status(200).json({ success: true, message: 'User successfully updated password.' });
        }
    } catch (error) {
        return response.status(500).json({ success: false, message: error.toString() });
    }
}

const deleteUser = async (request, response) => {
  const id = request.body.id;

  try {
      const user = await User.findOneAndDelete({ _id: id });

      if (!user) {
          return response.status(404).json({ success: false, message: 'User not found.' });
      }

      return response.status(200).json({ success: true, message: 'User successfully deleted.' });
  } catch (error) {
      return response.status(500).json({ success: false, message: error.toString() });
  }
};

module.exports = { getRegionalAdmins, getUserById, updateUser, deleteUser };
