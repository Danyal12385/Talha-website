const Region = require('../models/regionModel');
const Induction = require('../models/inductionModel');

const updateStatus = async (request, response) => {
  const { id, status } = request.body;

  try {
    const region = await Region.findById(id);

    if (!region) {
      return response.status(404).json({ success: false, error: 'Region not found.' });
    }

    region.induction = status;

    await region.save();

    return response.status(200).json({ success: true, message: 'Induction status successfully updated.' });

  } catch (err) {

    return response.status(500).json({ success: false, error: err.toString() });
  }
}

const fetchInduction = async (req, res) => {
  try {
    const inductions = await Induction.find().populate('region').lean();

    const data = [];

    for (const induction of inductions) {
      const updatedData = induction;
      updatedData.region = await Region.findOne({ _id: induction.region });
      data.push(updatedData);
    }

    return res.status(200).json({ success: true, data: data });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}

const getInduction = async (req, res) => {
  try {
    const { region } = req.body;

    const inductions = await Induction.find({ region });

    return res.status(200).json({ success: true, data: inductions });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}

const deleteInduction = async (req, res) => {
  try {
    const { id } = req.body;

    await Induction.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Induction request successfully deleted.' });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}


module.exports = { updateStatus, fetchInduction, getInduction, deleteInduction }