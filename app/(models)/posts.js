import mongoose,{ Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise


const postSchema = new Schema({
    postBody:{
    type:String,
        required:true,
},
    account: {
    type: mongoose.Schema.ObjectId,
    ref: 'account', // Make sure this matches the name used in mongoose.model("account", accountSchema)
}
},

{
    timestamps:true
}
)

const post = mongoose.models.post || mongoose.model('post',postSchema)
export default post