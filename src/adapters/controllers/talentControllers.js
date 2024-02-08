import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import { Encrypth } from "../../providers/bcryptPassword.js";
import { TalentUseCase } from "../../useCases/talent.intractor.js";


export class TalentController {
    constructor(talentUseCase, encrypt) {
        this.talentUseCase = new TalentUseCase();
        this.encrypt = new Encrypth()

    }
    async verifyEmail(req, res) {
        try {
            const { email, type } = req.body
            const { password } = req.body
            const isExist = await this.talentUseCase.isEmailExist(email);
            if (!isExist.status) {
                const securePassword = await this.encrypt.encrypthPassword(password)
                await this.talentUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.talentUseCase.saveSignupData(email, securePassword)
                return res.status(201).json(saved)
            }
            return res.status(403).json({ message: "email Alredy exsting" })
        } catch (error) {
            console.log(error.message);
        }
    }
    async verifyEmailToken(req, res) {
            try {
            const { token } = req.params;
            const isExist = await this.talentUseCase.isTokenExist(token);
            if (!isExist) {
                return res.status(403).json({ status: false });
            }
            return res.status(201).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }
    async addConatcDetails(req, res) {
        try {
            const formData = req.body
            const response = await this.talentUseCase.saveConatctDeatils(formData, req.clientId)
            if (response) {
                return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Conatct deatisl saved" })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async uploadProfileImg(req, res) {
        try {
            const fileName = req.file?.filename
            const id = req.clientId
            await this.talentUseCase.saveProfilePic(fileName, id)
            return res.status(STATUS_CODES.CREATED).json({status:true,message:"Successfully chnaged profile photo"})
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async TalentLogin(req, res) {
        try {
            const { email, password } = req.body
            const result = await this.talentUseCase.verifyLogin(email, password)
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
    async saveJobBasedData(req, res) {
        const id = req.clientId
        const result = await this.talentUseCase.saveJobData(req.body, id)
        return res.status(STATUS_CODES.OK).json(result)
    }
    async getTalentProfile(req, res) {
        const id = req.clientId
        const result = await this.talentUseCase.getProfilelData(id)
        if (result === null) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: "Can't fetch the profile data.. " })
        } else {
            return res.status(STATUS_CODES.OK).json(result)
        }
    }
    async editProfileFirstSection(req, res) {
        const id = req.clientId
        const editResult = await this.talentUseCase.editProfileSectionOne(req.body,id)
        return res.status(editResult.status).json(editResult.data)
    }
    async updateSkills(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editSkills(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateExperiance(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editExperiance(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateConatctDeatils(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editConatctDeatils(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }

}