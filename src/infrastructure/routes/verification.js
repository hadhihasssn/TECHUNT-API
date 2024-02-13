// Import necessary modules
import { Router } from 'express';
import 'dotenv/config';
import { Vcontoller } from '../../providers/controller.js';

// Create an instance of Router
const verification = Router();


verification.post('/login/', (req, res) => Vcontoller.TalentLogin(req, res))
// Export the verification router
verification.post("/checkValidNumber/", (req, res) => Vcontoller.checkNumberisValid(req, res))
export default verification;
