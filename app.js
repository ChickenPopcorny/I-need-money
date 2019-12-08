// 创建服务器
const express = require('express') 
const app = express()
const port = 80
app.listen(port, () => console.log(`服务器启动成功，正在监听 ${port} 端口`))

// 连接数据库
require('./models/connect.js')

// 引入数据库模型模块
const budgetModel = require('./models/budgetSchema.js')
const detailModel = require('./models/detailSchema.js')

// 引入系统和第三方模块
const path = require('path')
const formidable = require('express-formidable')

// 中间件
app.use(express.static(path.join(__dirname, 'public'))) // 配置静态资源目录
app.use(formidable()) // 获取请求参数

// 路由
app.get('/budgets', (req, res) => {
    // 忽略 id 字段
    budgetModel.findById('5de57928e17b00002a001252').select('-_id').then(result => {
        res.send(result)
    })
})

app.post('/budgets', (req, res) => {
    budgetModel.updateOne({ _id:'5de57928e17b00002a001252' }, req.fields).then(() => {
        res.send({ status: 0 })
    })
})

app.get('/details/:page', async (req, res) => {
    let pageSize = 10 // 每页条数
    let page = req.params.page // 当前页，客户端获取
    let count = await detailModel.countDocuments() // 数据总数，数据库获取
    count = count >= 50 ? 50 : count // 只查最多 50 条数据
    let totalPage = Math.ceil(count / pageSize) // 总页数

    detailModel.find().skip((page - 1) * pageSize).limit(pageSize).sort('-date').then(details => {
        res.send({ details, totalPage })
    })
})

app.post('/details', (req, res) => {
    detailModel.create(req.fields).then(() => {
        res.send({ status: 0 })
    })
})

app.delete('/details/:id', (req, res) => {
    detailModel.deleteOne({ _id: req.params.id }).then(() => {
        res.send({ status: 0 })
    })
})