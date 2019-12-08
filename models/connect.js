const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/0002_MyMoney', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库连接成功') })
    .catch(err => { console.log('数据库连接失败\n' + err) })