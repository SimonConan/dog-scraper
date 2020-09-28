const mongoose = require('mongoose');
const dotenv = require('dotenv');
const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}

    
// In order to remove warning in log
mongoose.set('useCreateIndex', true);

/**
 * Save a unique Breed in the DB
 * @param {object} breedData - the mongo document of a unique breed
 */
async function saveBreedData(breedData) {
    await mongoose.connect(process.env.DEV_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch(err => { throw new Error('MongoDB connection error: ' + err); });

    await breedData.save()
        .catch(err => { throw new Error('Error when saving : ' + breedData.nameId + ' ' + err); });
}

module.exports = {
    saveBreedData
};