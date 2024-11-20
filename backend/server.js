import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';




//app config

const app = express();
const port = process.env.PORT || 4000;


//middlewares

app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();


//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/users', userRouter);


app.get('/', (req, res) => {
    res.send('api working ');
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})  