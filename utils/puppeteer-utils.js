/**
 * Get the urls to all the breeds via puppeeter
 * @param {object} page - The current puppeteer page
 */
async function getBreedLinks(page) {
    try {
        const breedLinks = await page.evaluate((selector) => {
            const breedNodeList = document.querySelectorAll(selector);
            const breeds = [...breedNodeList];
            return breeds.map(link => link.href);
        }, '#all > div.racesList > div > a');

        return breedLinks;
    } catch (error) {
        throw new Error("Error when getting links " + error);
    }
}

/**
 * Get textContent based on a CSS selector via puppeeter
 * @param {object} page - The current puppeteer page
 * @param {string} selector - CSS selector defined in .env file
 */
async function getTextContent(page, selector) {
    try {
        const text = await page.evaluate((selector) => {
            return document.querySelector(selector).textContent;
        }, selector);

        return text.trim();
    } catch (error) {
        throw new Error("Error when getting textContent\nSelector: " + selector + "\n" + error);
    }
}

/**
 * Get textContent based on a CSS selector via puppeeter and return a number
 * @param {object} page - The current puppeteer page
 * @param {string} selector - CSS selector defined in .env file
 */
async function getTextAsNumber(page, selector) {
    try {
        let content = await page.evaluate((selector) => {
            return (!document.querySelector(selector)) ? 
            -1 : document.querySelector(selector).textContent;
        }, selector);

        return (content === 'NC') ? content = -1 : content = parseInt(content);
    } catch (error) {
        throw new Error("Error when getting text as a number\nSelector: " + selector + "\n" + error);
    }
}

/**
 * Get url image based on a CSS selector via puppeeter
 * @param {object} page - The current puppeteer page
 */
async function getBreedImg(page) {
    try {
        const breedImg = await page.evaluate((selector) => {
            return document.querySelector(selector).src;
        }, '#hab > div > div.row.parent > div.col-md-8.col-md-8-c > article > div > div.col-md-5.col-sm-5.np > div > picture > img');

        return breedImg;
    } catch (error) {
        throw new Error("Error when getting img " + error);
    }
}

/**
 * Get a note x/5 based on a CSS selector via puppeeter
 * @param {object} page - The current puppeteer page
 * @param {string} selector - CSS selector defined in .env file
 */
async function getNote(page, selector) {
    try {
        const note = await page.evaluate((selector) => {
            // We get all the gray note and we substract it to the MAX
            return (!document.querySelector(selector)) ?
                0 : (5 -  document.querySelector(selector).querySelectorAll('.gray').length);
        }, selector);

        return note;
    } catch (error) {
        throw new Error("Error when getting note\nSelector: " + selector + "\n" + error);
    }
}

module.exports = {
    getBreedLinks,
    getTextContent,
    getTextAsNumber,
    getBreedImg,
    getNote
};