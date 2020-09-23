const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const breedSchema = mongoose.Schema({
    nameId: {
        type: String,
        required: true,
        unique: true
    },
    originalLink: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    hairType: String,
    size: {
        type: String,
        required: true
    },
    behavior: {
        type: Number,
        required: true
    },
    behaviorOther: {
        type: Number,
        required: true
    },
    education: {
        type: Number,
        required: true
    },
    lifeConditions: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    lifespan: {
        type: Number,
        required: true
    },
    maintenance: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maintenancePrice: {
        type: Number,
        required: true
    },
    physicalActivity: {
        type: Number,
        required: true
    },
    masterCharacter: {
        type: String,
        required: true
    }
});

breedSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Breed', breedSchema);