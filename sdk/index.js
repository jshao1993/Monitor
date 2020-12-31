import errorCatch from './errorCatch'

errorCatch.init((errorData) => {
    console.log(errorData, 'errorData')
})