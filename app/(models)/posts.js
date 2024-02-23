import mongoose,{ Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise


const postSchema = new Schema({
    postBody:{
    type:String,
        required:true,
},

},

{
    timestamps:true
}
)

const post = mongoose.models.post || mongoose.model('post',postSchema)
export default post