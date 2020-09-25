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
    },
    behaviorWithOthers: {
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
    },
    education: {
        clever: {
            type: Number,
            required: true
        },
        obedient: {
            type: Number,
            required: true
        },
    },
    livingConditions: {
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
    },
    health: {
        goodHealth: {
            type: Number,
            required: true
        },
        easeToGainWeight: {
            type: Number,
            required: true
        },
    },
    lifespan: {
        lifespanMin: {
            type: Number,
            required: true
        },
        lifespanMax: {
            type: Number,
            required: true
        },
    },
    maintenance: {
        easeOfMaintenance: {
            type: Number,
            required: true
        },
        costOfMaintenance: {
            type: Number,
            required: true
        },
        hairLoss: {
            type: Number,
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
    },
    budget: {
        priceMin: {
            type: Number,
            required: true
        },
        priceMax: {
            type: Number,
            required: true
        },
        maintenanceBudgetMin: {
            type: Number,
            required: true
        },
        maintenanceBudgetMax: {
            type: Number,
            required: true
        }
    },
    physicalActivity: {
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
    }
});

// To be sure that the document is unique is the DB
breedSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Breed', breedSchema);