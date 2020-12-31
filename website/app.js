let koa = require('koa')
let serve = require('koa-static')
const API = require('./middleware/api')
const SourceMap = require('./middleware/sourceMap')

const app = new koa()
const port = 3003

app.use(SourceMap)
app.use(API)
app.use(serve(__dirname + '/client'))

app.listen(port, () => {
    console.log(`${port} is listen`)
})