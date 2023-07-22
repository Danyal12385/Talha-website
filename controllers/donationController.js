const Transaction = require('../models/transactionModel');

const fetchDonation = async (request, response) => {
  try {
    const transactions = await Transaction.find();

    return response.status(200).json({ success: true, data: transactions });

  } catch (error) {
    
    return response.status(500).json({ success: false, message: 'Failed to fetch transactions', error: error.toString() });
  }
}

async function deleteDonation(request, response) {
  const transactionId = request.body.id;
  try {
  
    const result = await Transaction.findByIdAndDelete(transactionId);

    if (!result) {
      return response.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    return response.json({ success: true, message: 'Transaction successfully deleted.' });

  } catch (error) {
    
    return response.status(500).json({ success: false, message: 'Failed to delete transaction.' });
  }
}

module.exports = { fetchDonation, deleteDonation };
