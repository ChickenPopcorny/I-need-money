const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    budgetType: Number, // 0: 本日余额, 1: 按揭还款, 2: 房租水电, 3: 话费, 4: 固定存款
    money: Number, // 金额
    date: String, // 日期
    note: String, // 备注
})

const detailModel = mongoose.model('Detail', detailSchema)

module.exports = detailModel