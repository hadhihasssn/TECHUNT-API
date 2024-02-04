import mongoose from "mongoose"


const { Schema, ObjectId } = mongoose;

const TalentSchema = new Schema({
    Last_name: { type: String, },
    First_name: { type: String, },
    Password: { type: String, },
    Email: { type: String, },
    Number: { type: String, },
    JobPost_id: { type: Schema.Types.ObjectId },
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
});

const Talent = mongoose.model('Talent', TalentSchema);

export default Talent;;