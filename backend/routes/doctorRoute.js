import express from 'express';
import { appointmentCancelled, appointmentComplete, appointmentsDoctor, doctorList, doctorProfile, loginDoctor, updateDoctorProfile, doctorDashboard } from '../controllers/doctorController.js';

import authDoctor from '../middleware/authDoctor.js';





const doctorRouter = express.Router();


doctorRouter.post('/list',doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor ,appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor ,appointmentComplete);
doctorRouter.post('/cancel-appointment',authDoctor ,appointmentCancelled);
doctorRouter.get('/dashboard',authDoctor ,doctorDashboard);
doctorRouter.get('/profile',authDoctor ,doctorProfile);
doctorRouter.post('/update-profile',authDoctor ,updateDoctorProfile);








export default doctorRouter;