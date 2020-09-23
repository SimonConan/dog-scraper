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
        console.log('Get all the breeds link');
		const breedLinks = await pUtils.getBreedLinks(page);
        console.log('All breeds detected (count: ' + breedLinks.length + ')');

        // Go through all the links and get the data
        for (let i = 0, length = breedLinks.length; i < length; i++) {
            let link = breedLinks[i];
            await page.goto(
				link, 
				{ waitUntil: 'networkidle2' }
			);
			
			let nameId = link.split('/race/')[1].split('/')[0];

			console.log('######\nBreed ' + i);
			console.log('nameId: ' + nameId);
			console.log('originalLink: ' + link);

			// Get breed name
			let breedName = await pUtils.getTextContent(page, process.env.NAME_SELECTOR);
			console.log('name: ' + breedName);
			
			// Get breed img
			let breedImg = await pUtils.getBreedImg(page);
			console.log('imageUrl: ' + breedImg);
			
			// Get breed hair
			let breedHair = await pUtils.getTextContent(page, process.env.HAIR_SELECTOR);
			console.log('hairType: ' + breedHair);
						
			// Get breed size
			let breedSize = await pUtils.getTextContent(page, process.env.SIZE_SELECTOR);
			console.log('hairType: ' + breedSize);
			
            console.log('######\n');
        }

        await browser.close();

    } catch (error) {
        throw error;
    }
})();