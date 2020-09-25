const dotenv = require('dotenv');
const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}

const Breed = require('../models/breed');
const pUtils = require('./puppeteer-utils');

/**
 * Get all the Data of a unique breed and return a Mongo document
 * @param {object} page - The current puppeteer page
 * @param {string} currentBreedLink - Link to the current breed
 */
async function getAllData(page, currentBreedLink) {
    let currentBreedData = [];
    currentBreedData.originalLink = currentBreedLink;

    // Go to the breed page
    await page.goto(
        currentBreedData.originalLink, { waitUntil: 'networkidle2' }
    );

    currentBreedData.nameId = currentBreedData.originalLink.split('/race/')[1].split('/')[0];

    // Get all the data in parallel
    const [
        name,
        imageUrl,
        hair,
        size,
        affectionate,
        calm,
        protective,
        independent,
        hunter,
        bark,
        withChildren,
        withAnimals,
        withStrangers,
        clever,
        obedient,
        apartment,
        newMasters,
        loveHot,
        loveCold,
        goodHealth,
        easeToGainWeight,
        lifespanMin,
        lifespanMax,
        easeOfMaintenance,
        costOfMaintenance,
        hairLoss,
        droolLevel,
        easeOfGrooming,
        priceMin,
        priceMax,
        maintenanceBudgetMin,
        maintenanceBudgetMax,
        athletic,
        energyLevel,
        enjoyToPlay
    ] = await Promise.all([
            pUtils.getTextContent(page, process.env.NAME_SELECTOR),
            pUtils.getBreedImg(page),
            pUtils.getTextContent(page, process.env.HAIR_SELECTOR),
            pUtils.getTextContent(page, process.env.SIZE_SELECTOR),
            pUtils.getNote(page, process.env.AFFECTIONATE_SELECTOR),
            pUtils.getNote(page, process.env.CALM_SELECTOR),
            pUtils.getNote(page, process.env.PROTECTIVE_SELECTOR),
            pUtils.getNote(page, process.env.INDEPENDENT_SELECTOR),
            pUtils.getNote(page, process.env.HUNTER_SELECTOR),
            pUtils.getNote(page, process.env.BARK_SELECTOR),
            pUtils.getNote(page, process.env.WITH_CHILDREN_SELECTOR),
            pUtils.getNote(page, process.env.WITH_ANIMALS_SELECTOR),
            pUtils.getNote(page, process.env.WITH_STRANGERS_SELECTOR),
            pUtils.getNote(page, process.env.CLEVER_SELECTOR),
            pUtils.getNote(page, process.env.OBEDIENT_SELECTOR),
            pUtils.getNote(page, process.env.APARTMENT_SELECTOR),
            pUtils.getNote(page, process.env.NEW_MASTERS_SELECTOR),
            pUtils.getNote(page, process.env.LOVE_HOT_SELECTOR),
            pUtils.getNote(page, process.env.LOVE_COLD_SELECTOR),
            pUtils.getNote(page, process.env.GOOD_HEALTH_SELECTOR),
            pUtils.getNote(page, process.env.GAIN_WEIGHT_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.LIFESPAN_MIN_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.LIFESPAN_MAX_SELECTOR),
            pUtils.getNote(page, process.env.EASE_MAINTENANCE_SELECTOR),
            pUtils.getNote(page, process.env.COST_MAINTENANCE_SELECTOR),
            pUtils.getNote(page, process.env.HAIR_LOSS_SELECTOR),
            pUtils.getNote(page, process.env.DROOL_LEVEL_SELECTOR),
            pUtils.getNote(page, process.env.EASE_GROOMING_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.PRICE_MIN_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.PRICE_MAX_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.MAINTENANCE_BUDGET_MIN_SELECTOR),
            pUtils.getTextAsNumber(page, process.env.MAINTENANCE_BUDGET_MAX_SELECTOR),
            pUtils.getNote(page, process.env.ATHLETIC_SELECTOR),
            pUtils.getNote(page, process.env.ENERGY_LEVEL_SELECTOR),
            pUtils.getNote(page, process.env.ENJOY_PLAY_SELECTOR)
        ])
        .catch(err => { throw new Error('Error when getting data: ' + err); });

    currentBreedData = {
        ...currentBreedData,
        name,
        imageUrl,
        hair,
        size,
        behavior: {
            affectionate,
            calm,
            protective,
            independent,
            hunter,
            bark
        },
        behaviorWithOthers: {
            withChildren,
            withAnimals,
            withStrangers
        },
        education: {
            clever,
            obedient
        },
        livingConditions: {
            apartment,
            newMasters,
            loveHot,
            loveCold
        },
        health: {
            goodHealth,
            easeToGainWeight
        },
        lifespan: {
            lifespanMin,
            lifespanMax
        },
        maintenance: {
            easeOfMaintenance,
            costOfMaintenance,
            hairLoss,
            droolLevel,
            easeOfGrooming
        },
        budget: {
            priceMin,
            priceMax,
            maintenanceBudgetMin,
            maintenanceBudgetMax
        },
        physicalActivity: {
            athletic,
            energyLevel,
            enjoyToPlay
        },
    };

    // Create the Mongo document based on the data model and the data retrieve with puppeteer
    const currentBreedDataDocument = new Breed({
        ...currentBreedData
    });

    return currentBreedDataDocument;
}

module.exports = {
    getAllData
};