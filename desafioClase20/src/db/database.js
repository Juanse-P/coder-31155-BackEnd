import mongoose from "mongoose";

const connectionString = process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/ecommerce';

export const initMongoDB = async () => {
    try {
        console.log('Conectando a la Data Base...');
        await mongoose.connect(connectionString);

        console.log('Ya se conecto la Data Base');
    } catch (error) {
        console.log(`error -> ${error}`);
        return error;
    }
};
