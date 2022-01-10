const mongoose = require('mongoose')

class Connection{
    constructor(){
        this.connectionMongo()
    }
    connectionMongo(){
        this.connectionMongo = mongoose.connect("mongodb://localhost/noderest",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(()=>{
            console.log("ok")
        })
        .catch((e)=>console.log(`erro ao estabelecer conexao ${e}`))
    }
    

    
}

module.exports= new Connection();