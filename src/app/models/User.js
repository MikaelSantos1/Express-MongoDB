const moongose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new moongose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

UserSchema.pre('save',async function(next){
    try{
        const hash= await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }catch(e){
        next(e)
    }
        
})
const User = moongose.model('User',UserSchema)

module.exports = User