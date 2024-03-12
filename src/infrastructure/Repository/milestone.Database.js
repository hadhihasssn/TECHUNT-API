import Milestone from "../../entites/models/subSchema/milestone.schema.js"
import Work from '../../entites/models/subSchema/work.schema.js'
export class MilestoneRepository {

    async createMilestone(milestone) {
        return await Milestone.create(milestone)
    }
    async sendMilesApproval(id, approval) {
        console.log(id, approval)
        return await Milestone.findByIdAndUpdate(id, {
            $set: { approval }
        });
    }
    async updateMilestoneStatus(id, status) {
        return await Milestone.findByIdAndUpdate(id, {
            $set: { completed: status }
        })
    }
    async updateMilestoneStatus(id, status) {
        return await Milestone.findByIdAndUpdate(id, {
            $set: { completed: status }
        })
    }
    async saveWork(id, data) {
        const saveWork = await Work.create(data)
        if (saveWork) {
            console.log(saveWork, "here to submit the  work")
            return await Milestone.findByIdAndUpdate(id, {
                $set: { work: saveWork._id }
            })
        }
    }
    async saveEditWork(id, data, workId) {
        return await Work.findByIdAndUpdate(workId, { $set: data }, { new: true }).exec();
    }
    async getWork(id) {
        return await Work.findById(id)
    }
    async updatePaymentUpdate(id) {
        return await Milestone.findByIdAndUpdate(id, { $set: { payed: true } }, { new: true })
    }
}
