const Report = require('../models/reportModel');

const regionReport = async (req, res) => {
  try {
    const { regionId } = req.body;

    const reports = await Report.find({ regionId });

    return res.json({ success: true, data: reports });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}

const addReport = async (req, res) => {
  try {
    const { regionId } = req.body;

    const report = new Report({
      regionId
    });

    report.image = req.file.path;

    await report.save();

    return res.json({ success: true, message: 'Report successfully saved.' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.toString() });
  }
}

const deleteReport = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'No ID provided.' });
    }

    await Report.findByIdAndDelete(id);

    return res.json({ success: true, message: 'Report successfully deleted.' });

  } catch (error) {

    return res.status(500).json({ success: false, message: errorText.toString() });
  }
}

const adminReport = async (req, res) => {
  try {
    const reports = await Report.find();

    return res.json({success: true, data: reports});

  } catch (error) {
    return res.status(500).json({success: false, message: error.toString()});
  }
}

module.exports = { regionReport, addReport, deleteReport, adminReport }