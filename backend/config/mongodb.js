import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.once('connected',()=>{
        console.log('MongoDB connected');
    })
   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
}

export default connectDB