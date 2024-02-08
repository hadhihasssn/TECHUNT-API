import { Router } from 'express';
const talent_Routes = Router();
import { Tcontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/talentAuth.js';
import { upload } from '../config/multer.js';




talent_Routes.post("/signup/", (req, res) => Tcontroller.verifyEmail(req, res))
    .get("/verify/:token", checkToken, (req, res) => Tcontroller.verifyEmailToken(req, res))
    .post("/add-contact/", checkToken, (req, res) => Tcontroller.addConatcDetails(req, res))
    .post("/upload-profile-pic/", checkToken, upload.single("image"), (req, res) => Tcontroller.uploadProfileImg(req, res))
    .post("/login/", (req, res) => Tcontroller.TalentLogin(req, res))
    .post("/save-bio-data/", checkToken, (req, res) => Tcontroller.saveJobBasedData(req, res))
    .get("/get-profile-Data/", checkToken, (req, res) => Tcontroller.getTalentProfile(req, res))
    .post("/edit-profile-section-1/", checkToken, (req, res) => Tcontroller.editProfileFirstSection(req, res))
    .post("/update-skills/",checkToken, (req,res) => Tcontroller.updateSkills(req,res))
    .post("/update-experiance/",checkToken, (req,res) => Tcontroller.updateExperiance(req,res))
    .post("/edit-profile-contact/",checkToken, (req,res) => Tcontroller.updateConatctDeatils(req,res))

export default talent_Routes;