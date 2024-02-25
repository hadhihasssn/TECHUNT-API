import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { ProposalRepository } from '../infrastructure/Repository/proposal.Database.js';
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { S3Service } from '../providers/S3.js';




export class ProposalUesCase {
    constructor() {
        this.proposalRepository = new ProposalRepository()
        this.s3 = new S3Service()
    }
    async saveProposal(data, id) {
        try {
            data.talentId = id
            const datas = await this.proposalRepository.insertProposal(data)
            if (datas === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "Error occures while saving proposal.",
                    success: false
                }
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully propsal saved .",
                success: true
            }
        } catch (err) {
            get500Response(err)
        }
    }

    async getSignedUrl(key, content_type) {
        try {
            const { signedUrl, fileLink } = await this.s3.createPreSignedPost({
                key: ("public/" + key),
                content_type: content_type
            })
            if (!signedUrl || !fileLink) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    success: false
                }
            }
            return {
                status: STATUS_CODES.OK,
                data: {
                    signedUrl,
                    fileLink
                },
                success: false
            }
        } catch (err) {
            get500Response(err)
        }
    }
}