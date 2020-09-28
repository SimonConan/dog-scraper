const puppeteer = require('puppeteer');

const pUtils = require('./utils/puppeteer-utils');
const dUtils = require('./utils/data-utils');
const breedCtrl = require('./controllers/breed');

(async () => {

	// Load Puppeteer browser and page
	const browser = await puppeteer.launch({
		args: ['--no-sandbox']
	});
	const page = await browser.newPage();
	await page.goto(
		process.env.URL_TO_SCRAP, { waitUntil: 'networkidle2' }
	);

	// Get all the links
	console.log('\nGet all the breeds link');
	const breedLinks = await pUtils.getBreedLinks(page);
	console.log('All breeds detected (count: ' + breedLinks.length + ')\n');

	// Go through all the links and get the data
	for (let i = 0, length = breedLinks.length; i < length; i++) {

		try {
			// Get all data on the current breed
			console.log('\n######\nGetting all data on breed num ' + i);
			let currentBreedData = await dUtils.getAllData(page, breedLinks[i]);
			console.log(currentBreedData.name + ' data get');
			
			// When all the data are get, save them
			console.log('Saving ' + currentBreedData.name);
			await breedCtrl.saveBreedData(currentBreedData);
			console.log(currentBreedData.name + ' saved\n######\n');
		} catch (error) {
			console.log(error);
			continue;
		}

	}

	await browser.close();
	process.exit(0);

})().catch(err => {
	console.log(err);
	process.exit(1);
});