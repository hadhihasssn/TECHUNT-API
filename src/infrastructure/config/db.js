import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const uri = `mongodb+srv://${process.env.ATLAS_USERNMAE}:${process.env.ATLES_PASSWORD}@${process.env.ATLAS_clusterUrl}/?retryWrites=true&w=majority`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(uri, options);
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectDb;
