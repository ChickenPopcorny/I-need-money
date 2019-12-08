const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    today: Number,
    month: Number,
    repayment: Number,
    house: Number,
    phone: Number,
    deposit: Number
})

const budgetModel = mongoose.model('Budget', budgetSchema)

module.exports = budgetModel