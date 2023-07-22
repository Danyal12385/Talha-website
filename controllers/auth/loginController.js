const User = require('../../models/userModel');
const Region = require('../../models/regionModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const payload = { id: user._id, email: user.email, role: user.role };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
   
        res.cookie('token', token);

        if(user.role === 'ra'){
            var region = await Region.findOne({'raId': user._id});
        }

        res.status(200).json({ success: true, data: {user: user, region: region ?? ''}, message: "Successfully logged in." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.toString() });
    }
}

module.exports = { login }