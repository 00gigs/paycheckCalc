import  mongoose, { Schema }  from "mongoose";


mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const accountSchema = new Schema({
    name:{
    type:String,
        required:true,
},
    email:{
    type:String,
        required:true,
},
    Password:{
    type:String,
        required:true,
},

},

{
    timestamps:true
}
)


const account = mongoose.models.account || mongoose.model("account",accountSchema)
export default account

// const accountPostSchema = new Schema({
//     name:{
//     type:String,
// },
//     post:{
//     type:String,
//         required:true,
// },

// },
// {timestamps:true})