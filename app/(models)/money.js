import  mongoose, {Schema} from "mongoose";
import { global } from "styled-jsx/css";

//connect to mongodb 
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const moneySchema = new Schema({
    amountSaved: {
      type: Number,
      required: true,
    },
    amountInvested: {
      type: Number,
      required: true,
    },
    finAccount: {
    
  
    },
    // Include other fields as necessary
  }, {
    timestamps: true,
  });
  
const moneyinfo = mongoose.models.moneyinfo || mongoose.model('moneyinfo',moneySchema)
export default moneyinfo