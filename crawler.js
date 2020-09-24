const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const conf = dotenv.config();

if (conf.error) {
	throw conf.error;
}

const pUtils = require('./utils/puppeteer-utils');

(async () => {
    try {

        // Load Puppeteer browser and page
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(
			process.env.URL_TO_SCRAP, 
			{ waitUntil: 'networkidle2' }
        );

        // Get all the links
        console.log('\nGet all the breeds link');
		// const breedLinks = await pUtils.getBreedLinks(page);
		const breedLinks = await pUtils.getBreedLinks(page);
        console.log('All breeds detected (count: ' + breedLinks.length + ')\n');

        // Go through all the links and get the data
        // for (let i = 0, length = breedLinks.length; i < length; i++) {
		for (let i = 0, length = breedLinks.length; i < 1; i++) {
            let link = breedLinks[i];
            await page.goto(
				link, 
				{ waitUntil: 'networkidle2' }
			);
			
			// get global datas
			let nameId = link.split('/race/')[1].split('/')[0];
			let breedName = await pUtils.getTextContent(page, process.env.NAME_SELECTOR);
			let breedImg = await pUtils.getBreedImg(page);
			let breedHair = await pUtils.getTextContent(page, process.env.HAIR_SELECTOR);
			let breedSize = await pUtils.getTextContent(page, process.env.SIZE_SELECTOR);

			// get all behavior notes
			let affectionateNote = await pUtils.getNote(page, process.env.AFFECTIONATE_SELECTOR);
			let calmNote = await pUtils.getNote(page, process.env.CALM_SELECTOR);
			let protectiveNote = await pUtils.getNote(page, process.env.PROTECTIVE_SELECTOR);
			let independentNote = await pUtils.getNote(page, process.env.INDEPENDENT_SELECTOR);
			let hunterNote = await pUtils.getNote(page, process.env.HUNTER_SELECTOR);
			let barkNote = await pUtils.getNote(page, process.env.BARK_SELECTOR);

			// get all behavior with others notes
			let withChildrenNote = await pUtils.getNote(page, process.env.WITH_CHILDREN_SELECTOR);
			let withAnimalsNote = await pUtils.getNote(page, process.env.WITH_ANIMALS_SELECTOR);
			let withStrangersNote = await pUtils.getNote(page, process.env.WITH_STRANGERS_SELECTOR);
			
			// get all education notes
			let cleverNote = await pUtils.getNote(page, process.env.CLEVER_SELECTOR);
			let obedientNote = await pUtils.getNote(page, process.env.OBEDIENT_SELECTOR);

			// get all living conditions notes
			let apartmentNote = await pUtils.getNote(page, process.env.APARTMENT_SELECTOR);
			let newMastersNote = await pUtils.getNote(page, process.env.NEW_MASTERS_SELECTOR);
			let loveHotNote = await pUtils.getNote(page, process.env.LOVE_HOT_SELECTOR);
			let loveColdNote = await pUtils.getNote(page, process.env.LOVE_COLD_SELECTOR);

			// get all health notes
			let goodHealthNote = await pUtils.getNote(page, process.env.GOOD_HEALTH_SELECTOR);
			let gainWeightNote = await pUtils.getNote(page, process.env.GAIN_WEIGHT_SELECTOR);

			// get lifespan data
			let lifespanMin = await pUtils.getTextAsNumber(page, process.env.LIFESPAN_MIN_SELECTOR);
			let lifespanMax = await pUtils.getTextAsNumber(page, process.env.LIFESPAN_MAX_SELECTOR);

			// get all maintenance notes
			let easeMaintenanceNote = await pUtils.getNote(page, process.env.EASE_MAINTENANCE_SELECTOR);
			let costMaintenanceNote = await pUtils.getNote(page, process.env.COST_MAINTENANCE_SELECTOR);
			let hairLossNote = await pUtils.getNote(page, process.env.HAIR_LOSS_SELECTOR);
			let droolLevelNote = await pUtils.getNote(page, process.env.DROOL_LEVEL_SELECTOR);
			let easeGroomingNote = await pUtils.getNote(page, process.env.EASE_GROOMING_SELECTOR);

			// get price and maintenanceBudget price
			let priceMin = await pUtils.getTextAsNumber(page, process.env.PRICE_MIN_SELECTOR);
			let priceMax = await pUtils.getTextAsNumber(page, process.env.PRICE_MAX_SELECTOR);
			let maintenanceBudgetMin = await pUtils.getTextAsNumber(page, process.env.MAINTENANCE_BUDGET_MIN_SELECTOR);
			let maintenanceBudgetMax = await pUtils.getTextAsNumber(page, process.env.MAINTENANCE_BUDGET_MAX_SELECTOR);

			// get physical activity data
			let athleticNote = await pUtils.getNote(page, process.env.ATHLETIC_SELECTOR);
			let energyLevelNote = await pUtils.getNote(page, process.env.ENERGY_LEVEL_SELECTOR);
			let enjoyPlayNote = await pUtils.getNote(page, process.env.ENJOY_PLAY_SELECTOR);

			
			console.log('######');
			console.log(' Breed ' + i);
			console.log('nameId: ' + nameId);
			console.log('originalLink: ' + link);
			console.log('name: ' + breedName);
			console.log('imageUrl: ' + breedImg);
			console.log('hairType: ' + breedHair);
			console.log('size: ' + breedSize);
			console.log('affectionate: ' + affectionateNote);
			console.log('calm: ' + calmNote);
			console.log('protective: ' + protectiveNote);
			console.log('independent: ' + independentNote);
			console.log('hunter: ' + hunterNote);
			console.log('bark: ' + barkNote);
			console.log('withChilden: ' + withChildrenNote);
			console.log('withAnimals: ' + withAnimalsNote);
			console.log('withStrangers: ' + withStrangersNote);
			console.log('clever: ' + cleverNote);
			console.log('obedient: ' + obedientNote);
			console.log('apartment: ' + apartmentNote);
			console.log('newMasters: ' + newMastersNote);
			console.log('loveHot: ' + loveHotNote);
			console.log('loveCold: ' + loveColdNote);
			console.log('goodHealth: ' + goodHealthNote);
			console.log('gainWeight: ' + gainWeightNote);
			console.log('lifespanMin: ' + lifespanMin);
			console.log('lifespanMiax: ' + lifespanMax);
			console.log('easeMaintenance: ' + easeMaintenanceNote);
			console.log('costMaintenance: ' + costMaintenanceNote);
			console.log('hairLoss: ' + hairLossNote);
			console.log('droolLevel: ' + droolLevelNote);
			console.log('easeGrooming: ' + easeGroomingNote);
			console.log('priceMin: ' + priceMin);
			console.log('priceMax: ' + priceMax);
			console.log('maintenanceBudgetMin: ' + maintenanceBudgetMin);
			console.log('maintenanceBudgetMax: ' + maintenanceBudgetMax);
			console.log('athletic: ' + athleticNote);
			console.log('energyLevel: ' + energyLevelNote);
			console.log('enjoyPlay: ' + enjoyPlayNote);
            console.log('######\n');
        }

        await browser.close();

    } catch (error) {
        throw error;
    }
})();