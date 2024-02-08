import mongoose from "mongoose";
import talent from "../../entites/models/talen.model.js";
import Token from "../../entites/models/token.js";
import { STATUS_CODES } from "../../constants/httpStatusCode.js";


export class TalentRepository {
    async findByEmail(email) {
        const user = await talent.findOne({ Email: email });
        if (user === null) {
            return { status: false, data: user }
        }
        return { status: true, data: user }
    }
    async findById(id) {
        return await talent.findById(id)
    }

    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }

    async addTalentSingupData(email, password) {
        try {
            const data = new talent({
                Email: email,
                Password: password
            });
            await data.save();
            return data;
        } catch (error) {
            throw new Error("Saving email got an error");  // Corrected error handling
        }
    }
    async addConatctDeatils(formData, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                Last_name: formData.lName,
                First_name: formData.fName,
                Address: formData.address,
                PinCode: formData.PinCode,
                City: formData.city,
                number: formData.Number,
                Country: formData.country,
                'Profile.Description': formData.description
            },
                { new: true }
            )
        } catch (error) {

            console.error(error.message);
            // throw new Error('Failed to save add contact deatils');
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async saveProfilePic(fileName, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                "Profile.profile_Dp": fileName,
            })
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to save profile picture');
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async addJobData(data, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                "Profile.Title": data.title,
                "Profile.Skills": data.skills,
                "Profile.Work_Experiance": data.experiance
            })
        } catch (error) {
            consoel.lo(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }

    async updateprofile(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                "Profile.Description": data.description,
                "Profile.Title": data.title,
                "Last_name": data.first_name,
                "First_name": data.last_name,
            })
            if (result) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    data: "Error occurs when updaing profile data"
                }
            } else {
                return {
                    status: STATUS_CODES.OK,
                    data: result
                }
            }
        } catch (error) {
            console.log(error.message);
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async updateSkills(data, id) {
        console.log(data, id);
        try {
            const result = await talent.findByIdAndUpdate(id, {
                "Profile.Skills": data
            })
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating profile data success "
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating profile data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async updateExperiance(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                "Profile.Work_Experiance": data
            });
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating profile data is success"
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating profile data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async editConatct(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                $set: data // Use $set to specify the fields to update
            });
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating contact data is success"
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating contact data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }

}

