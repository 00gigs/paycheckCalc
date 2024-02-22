import  mongoose, { Schema }  from "mongoose";


mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise
//json schema and inputs are case sensitive make sure the back-end schema CASE matches front-end input names
const accountSchema = new Schema({
    name:{
    type:String,
        required:true,
},
    email:{
    type:String,
        required:true,
},
    password:{
    type:String,
        required:true,
},

},

{
    timestamps:true
}
)


const account = mongoose.models.account || mongoose.model("account",accountSchema)
//models have to be export default !!!!
export default account
