const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const conf = dotenv.config();

if (conf.error) {
	throw conf.error;
}

const pUtils = require('../utils/puppeteer-utils');

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
		const breedLinks = await pUtils.getBreedLinks(page);
        console.log('All breeds detected (count: ' + breedLinks.length + ')\n');

        // Go through all the links and get the data
        for (let i = 0, length = breedLinks.length; i < length; i++) {
            let link = breedLinks[i];
            await page.goto(
				link, 
				{ waitUntil: 'networkidle2' }
			);
			
			let nameId = link.split('/race/')[1].split('/')[0];
			let breedName = await pUtils.getTextContent(page, process.env.NAME_SELECTOR);
			let breedImg = await pUtils.getBreedImg(page);
			let breedHair = await pUtils.getTextContent(page, process.env.HAIR_SELECTOR);
			let breedSize = await pUtils.getTextContent(page, process.env.SIZE_SELECTOR);
			let affectionateNote = await pUtils.getNote(page, process.env.AFFECTIONATE_SELECTOR);
			let calmNote = await pUtils.getNote(page, process.env.CALM_SELECTOR);
			let protectiveNote = await pUtils.getNote(page, process.env.PROTECTIVE_SELECTOR);
			let independentNote = await pUtils.getNote(page, process.env.INDEPENDENT_SELECTOR);
			let hunterNote = await pUtils.getNote(page, process.env.HUNTER_SELECTOR);
			let barkNote = await pUtils.getNote(page, process.env.BARK_SELECTOR);
			
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
            console.log('######\n');
        }

        await browser.close();

    } catch (error) {
        throw error;
    }
})();