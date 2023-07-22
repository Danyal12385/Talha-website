const Family = require('../models/familyModel');

const familyFormHandler = async (request, response) => {
    const family = new Family({
        name: request.body.name,
        headName: request.body.headName,
        faterName: request.body.faterName,
        cnic: request.body.cnic,
        phone: request.body.phone,
        address: request.body.address,
        house: request.body.house,
        region: request.body.city,
        income: request.body.income,
        feeCase: request.body.feeCase,
    });

    if (request.files.length !== 0) {
        for (let i = 0; i < request.files.length; i++) {
            family[request.files[i].fieldname] = request.files[i].path;
        }
    }

    let randomNumber = 0;
    for (let i = 0; i < 10; i++) {
        const digit = Math.floor(Math.random() * 10);
        randomNumber = randomNumber * 10 + digit;
    }

    family.registrationNumber = randomNumber;

    const result = family.save();

    await result.then((familyData) => {
        response.status(200).json({ success: true, message: "Family data successfully registered.", data: familyData });
    })

        .catch((error) => {
            response.status(500).json({ success: false, message: error.toString() });
        })
}

const getFamily = async (req, res) => {
    try {
      const { region } = req.body;

      const families = await Family.find({ region });

      return res.json({ success: true, data: families });

    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

const fetchFamily = async (req, res) => {
    try {
      const families = await Family.find();

      return res.json({ success: true, data: families });

    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

module.exports = { familyFormHandler, getFamily, fetchFamily }