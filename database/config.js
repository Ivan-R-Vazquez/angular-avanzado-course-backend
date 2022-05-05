const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        // This way isn't required anymore
        // await mongoose.connect('mongodb+srv://navi:P3e61X27muWShH1E@cluster0.v5x3r.mongodb.net/hospitaldb',{
        //     userNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar a la BD ver logs');
    }
}

module.exports = {
    dbConnection
}