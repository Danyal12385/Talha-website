const Sponsor = require('../models/sponsorModel');
const Event = require('../models/eventModel');
const Region = require('../models/regionModel');

const addSponser = async (req, res) => {
  try {
    const { name, cnic, phone, region, address, event } = req.body;

    const sponsor = new Sponsor({
      name,
      cnic,
      phone,
      region,
      address,
      event
    });

    await sponsor.save();

    return res.status(200).json({ success: true, message: 'Your have successfully sponsored this event.' });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}

const fetchSponsor = async (req, res) => {
  try {
    const sponsors = await Sponsor.find();

    const data = [];

    for (const sponsor of sponsors) {
      const event = await Event.findOne({ _id: sponsor.event });
      const region = await Region.findOne({ _id: sponsor.region });

      const updatedData = sponsor.toObject();

      updatedData.event = event;
      updatedData.region = region;

      data.push(updatedData);
    }

    return res.status(200).json({ success: true, data: data });

  } catch (err) {

    return res.status(500).json({ success: false, message: err.toString() });
  }
}


const getSponsor = async (req, res) => {
  try {
    const region = req.body.region;
    const sponsors = await Sponsor.find({ region: region });

    const data = [];

    for (const sponsor of sponsors) {
      const event = await Event.findOne({ _id: sponsor.event });

      const updatedData = sponsor.toObject();

      updatedData.event = event;

      data.push(updatedData);
    }

    return res.status(200).json({ success: true, data: data });

  } catch (err) {

    return res.status(500).json({ success: false, message: err.toString() });
  }
}


const deleteSponsor = async (req, res) => {
  try {
    const { id } = req.body;

    await Sponsor.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Sponsor successfully deleted.' });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.toString() });
  }
}

module.exports = { addSponser, fetchSponsor, getSponsor, deleteSponsor }