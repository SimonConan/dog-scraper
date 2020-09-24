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
    behavior : {
        type: [{
            affectionate: {
                type: Number,
                required: true
            },
            calm: {
                type: Number,
                required: true
            },
            protective: {
                type: Number,
                required: true
            },
            independent: {
                type: Number,
                required: true
            },
            hunter: {
                type: Number,
                required: true
            },
            bark: {
                type: Number,
                required: true
            }
        }]
    },
    behaviorWithOthers : {
        type: [{
            withChildren: {
                type: Number,
                required: true
            },
            withAnimals: {
                type: Number,
                required: true
            },
            withStrangers: {
                type: Number,
                required: true
            },
        }]
    },
    education : {
       type: [{
            clever: {
                type: Number,
                required: true
            },
            obedient: {
                type: Number,
                required: true
            },
        }]
    },
    livingConditions : {
        type: [{
            apartment: {
                type: Number,
                required: true
            },
            newMasters: {
                type: Number,
                required: true
            },
            loveHot: {
                type: Number,
                required: true
            },
            loveCold: {
                type: Number,
                required: true
            },
        }]
    },
    health: {
        type: [{ 
            goodHealth: {
                type: Number,
                required: true
            },
            easeToGainWeight: {
                type: Number,
                required: true
            },
        }]
    },
    maintenance: {
        type: [{
            easeOfMaintenance: {
                type: Number,
                required: true
            },
            costOfMaintenance: {
                type: Number,
                required: true
            },    
            hairLoss: {
                type: String,
                required: true
            },
            droolLevel: {
                type: Number,
                required: true
            },
            easeOfGrooming: {
                type: Number,
                required: true
            },
        }]
    },
    physicalActivity: {
        type: [{
            athletic: {
                type: Number,
                required: true
            },
            energyLevel: {
                type: Number,
                required: true
            },
            enjoyToPlay: {
                type: Number,
                required: true
            }
        }]
    }
});

breedSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Breed', breedSchema);