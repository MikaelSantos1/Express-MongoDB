const express = require('express')
const router = require('./routes/routes')
const bodyParser = require('body-parser')
require('./database/index')
class App {
    constructor(){
        this.app=express()
        this.app.use(express.json())
        this.router()
        
    }
    router(){
        this.app.use('/',router)
    }
}
module.exports = new App().app