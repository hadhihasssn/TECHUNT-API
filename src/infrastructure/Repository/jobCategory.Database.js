import mongoose, { Schema } from "mongoose"
import jobCategorySchema from '../../entites/models/jobCategory.model.js'

export class JobCategoryRepository {
    async findByName(name, id) {
        return await jobCategorySchema.findOne({ name, _id: { $ne: id } });
    }
    async addNewJobCategory(data) {
        return new jobCategorySchema(data).save()
    }
    async getAllCategory() {
        return await jobCategorySchema.find()
    }
    async changeStatus(status, id) {
        return await jobCategorySchema.findByIdAndUpdate(id, {
            status
        })
    }
    async update(data, id) {
        return await jobCategorySchema.findByIdAndUpdate(id, data, { new: true });
    }

}