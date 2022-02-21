const { stdin } = require('process')

function getNameFromCommandLine() {
    return process.argv[5]
    // Write you code here, name should be taken as args in process.argv
}

function getNameFromEnv() {
    return process.env.name
    
    // Write your code here
}

function getNameFromReadLine() {
    var readline=require('readline')
    readline.createInterface({
        input:stdin,
        output:stdout
    })
    // Write your code here
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}