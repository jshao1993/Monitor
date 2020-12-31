let formatError = errorObj => {
    let col = errorObj.column || errorObj.columnNumber // 兼容safari和firefox，谷歌没有列信息
    let row = errorObj.line || errorObj.lineNumber // 兼容safari和firefox，谷歌没有行信息
    let errorType = errorObj.name
    let message = errorObj.message

    let { stack } = errorObj
    // chrome 没有行列信息
    if (stack) {
        // matchUrl 里面有报错url和报错的位置
        let matchUrl = stack.match(/https?:\/\/[^\n]+/) // 匹配栈顶的报错
        let urlFirstStack = matchUrl ? matchUrl[0] : ''
        // "http://localhost:3003/js/main.js:31:5)"

        // 获取真正的url
        let resourceUrl = ''
        let regUrlCheck = /https?:\/\/(\S)*\.js/
        if (regUrlCheck.test(urlFirstStack)) {
            resourceUrl = urlFirstStack.match(regUrlCheck)[0]
        }

        // 获取真正的行列信息
        let stackCol = null
        let stackRow = null
        let posStack = urlFirstStack.match(/:(\d+):(\d+)/) // "http://localhost:3003/js/main.js:31:5)"
        if (posStack && posStack.length >= 3) {
            [, stackRow, stackCol] = posStack
        }

        //TODO formatStack
        return {
            content: stack,
            col: Number(stackCol || col),
            row: Number(stackRow || row),
            errorType,
            message,
            resourceUrl
        }
    }
}

export default {
    init: (cb) => {
        let _origin_error = window.onerror
        window.onerror = function (message, source, lineno, colno, error) {
            console.dir(error, 'error')
            debugger
            try {
                let errorInfo = formatError(error)
                // 原生信息
                errorInfo._message = message
                errorInfo._source = source
                errorInfo._lineno = lineno
                errorInfo._colno = colno
                errorInfo.type = 'onerror'
                cb(errorInfo)
                _origin_error && _origin_error.apply(window, arguments)
            } catch (error) {
                console.log(error)
            }
        }
    }
}