const HomeContent = require('../models/homeContentModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const Report = require('../models/reportModel');
const Transaction = require('../models/transactionModel');
const Sponsor = require('../models/sponsorModel');
const Family = require('../models/familyModel');
const Region = require('../models/regionModel');
const Induction = require('../models/inductionModel');

const adminDashboardStats = async (req, res) => {
    try {
        const homeContentCount = await HomeContent.countDocuments();
        const regionCount = await Region.countDocuments();
        const userCount = await User.countDocuments();
        const eventCount = await Event.countDocuments();
        const reportCount = await Report.countDocuments();
        const transactionCount = await Transaction.countDocuments();
        const sponsorCount = await Sponsor.countDocuments();
        const familyCount = await Family.countDocuments();
        const inductionCount = await Induction.countDocuments();
    
        res.json({
          success: true,
          data: {
            homeContentCount,
            regionCount,
            userCount,
            eventCount,
            reportCount,
            transactionCount,
            sponsorCount,
            familyCount,
            inductionCount
          }
        })
      } catch (error) {
        
        res.status(500).json({ success: false, data: error.message });
      }
}

const raDashboardStats = async (req, res) => {
  try {
    const id = req.body.id;

    const eventCount = await Event.countDocuments({ regionId: id });
    const reportCount = await Report.countDocuments({ regionId: id });
    const sponsorCount = await Sponsor.countDocuments({ region: id });
    const familyCount = await Family.countDocuments({ region: id });
    const inductionCount = await Induction.countDocuments({ region: id });

    res.json({
      success: true,
      data: {
        eventCount,
        reportCount,
        sponsorCount,
        familyCount,
        inductionCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};


module.exports = { adminDashboardStats, raDashboardStats }