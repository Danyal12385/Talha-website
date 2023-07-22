require('dotenv').config();
const Transaction = require('../models/transactionModel');

const checkoutSession = async (request, response) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

    let sessionId = Math.random();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'pkr',
          product_data: {
            name: 'Donations'
          },
          unit_amount: request.body.amount * 100
        },
        quantity: 1
      }],
      success_url: `${process.env.SITE_URL}/checkout/success?sessionId=${sessionId}`,
      cancel_url: `${process.env.SITE_URL}/checkout/cancel?sessionId=${sessionId}`,
      customer_email: request.body.email
    });

    const transaction = new Transaction({
      sessionId: sessionId,
      amount: session.amount_total / 100,
      status: 'pending',
      email: request.body.email
    });

    await transaction.save();

    response.json({url: session.url});
  } catch (error) {
    response.status(500).json({error: error.message});
  }
}

const markPaid = async (request, response) => {
  const { sessionId } = request.body;

  try {
    const transaction = await Transaction.findOne({ sessionId });

    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = 'paid';
    await transaction.save();

    
    return response.status(200).json({ message: 'Transaction status updated to unpaid' });

  } catch (err) {
    
    return response.status(500).json({ message: 'Failed to update transaction status' });
  }
}

const markUnpaid = async (request, response) => {
  const { sessionId } = request.body;

  try {
    const transaction = await Transaction.findOne({ sessionId });

    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = 'unpaid';
    await transaction.save();

    
    return response.status(200).json({ message: 'Transaction status updated to unpaid' });

  } catch (err) {
    
    return response.status(500).json({ message: 'Failed to update transaction status' });
  }
}

module.exports = { checkoutSession, markPaid, markUnpaid }
