import { Router } from 'express';
const client_Routes = Router();
import { Ccontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/clientAuth.js';
import { upload } from '../config/multer.js';


client_Routes.post("/signup/", (req, res) => Ccontroller.verifyEmail(req, res))
            .get("/verify/:token", checkToken, (req, res) => Ccontroller.verifyEmailToken(req, res))
            .post("/add-contact/", checkToken, (req, res) => Ccontroller.addConatcDetails(req, res))
            .post("/upload-profile-pic/", checkToken, upload.single("image"), (req, res) => Ccontroller.uploadProfileImg(req, res))
            .post("/login/", checkToken, (req, res) => Ccontroller.Clientlogin(req, res))
            .get("/get-profile-Data/", checkToken, (req, res) => Ccontroller.getClientProfile(req, res))
            .post("/edit-profile-section-1/", checkToken, (req, res) => Ccontroller.editProfile(req, res))
            .post("/edit-profile-contact/", checkToken, (req, res) => Ccontroller.updateConatctDeatils(req, res))
export default client_Routes;
