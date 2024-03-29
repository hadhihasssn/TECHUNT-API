import mongoose from "mongoose"

const { Schema, ObjectId } = mongoose;

const ClientSchema = new Schema({
  Last_name: { type: String, },
  First_name: { type: String, },
  Password: { type: String, },
  Email: { type: String, },
  Number: { type: String, },
  JobPost_id: [{ type: Schema.Types.ObjectId, ref: 'JobPost' }],
  Profile: {
    profile_Dp: { type: String },
    Completed_contract: { type: Number },
    Description: { type: String },
    Name: { type: String },
    NumberOfHired: { type: Number },
    Pending_contract: { type: Number },
    Total_contract: { type: Number },
  },
  Address: { type: String, },
  PinCode: { type: String, },
  City: { type: String, },
  Country: { type: String, },
  lastSeen: { type: Date },
  isBlock: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  isVerify: { type: Boolean, default: false },
  isNumberVerify: { type: Boolean, default: false },
  bankDetails: { type: Schema.Types.ObjectId, ref: "BankAccount" },
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', ClientSchema);

export default Client;

