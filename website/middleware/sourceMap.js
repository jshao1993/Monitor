const fs = require('fs')
const path = require('path')
let sourceMap = require('source-map')

// sourcemap文件地址
let sourceMapFilePath = path.join(__dirname, '../client/react-app/dist/main.bundle.js.map')

let sourceFileMap = {}
let fixPath = (filePath) => {
    return filePath.replace(/\.[\.\/]+/, '')
}

module.exports = async (ctx, next) => {
    if (ctx.path === '/sourcemap') {
        let sourceMapContent = fs.readFileSync(sourceMapFilePath, 'utf-8') // 测试sourcemap文件
        let fileObj = JSON.parse(sourceMapContent)
        let { sources } = fileObj

        // sourceFileMap key是修复过的path(webpack:///react-app.js)，value是未修复过的path(webpack:///./react-app.js)
        sources.forEach(item => {
            sourceFileMap[fixPath(item)] = item
        });

        let line = 1 // 测试行号
        let column = 11286 // 测试列号

        const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent)
        let result = consumer.originalPositionFor({ line, column }) // result中的source是修复过的path

        let originSource = sourceFileMap[result.source] // 获取未修复过的path
        let sourcesContent = fileObj.sourcesContent[sources.findIndex(v => v === originSource)]
        let sourcesContentArr = sourcesContent.replace(/\r$/mg,'').split('\n')

        ctx.body = { fileObj, sourceFileMap, sourcesContentArr, sourcesContent, originSource, result }
    }
    return next()
}
