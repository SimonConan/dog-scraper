async function getBreedLinks(page) {
    try {
        const breedLinks = await page.evaluate((selector) => {
            const breedNodeList = document.querySelectorAll(selector);
            const breeds = [...breedNodeList];
            return breeds.map(link => link.href, );
        }, '#all > div.racesList > div > a');

        return breedLinks;
    } catch (error) {
        throw new Error("Error when getting links " + error);
    }
}

async function getTextContent(page, selector) {
    try {
        let text = await page.evaluate((selector) => {
            let content = document.querySelector(selector);
            return content.textContent;
        }, selector);

        return text.trim();
    } catch (error) {
        throw new Error("Error when getting textContent\nSelector: " + selector + "\n" + error);
    }
}

async function getTextAsNumber(page, selector) {
    try {
        let content = await page.evaluate((selector) => {
            let value = document.querySelector(selector);
            return value.textContent;
        }, selector);
        
        return (content === 'NC') ? content = 0 : content = parseInt(content);
    } catch (error) {
        throw new Error("Error when getting text as a number\nSelector: " + selector + "\n" + error);
    }
}

async function getBreedImg(page) {
    try {
        const breedImg = await page.evaluate((selector) => {
            let img = document.querySelector(selector);
            return img.src;
        }, '#hab > div > div.row.parent > div.col-md-8.col-md-8-c > article > div > div.col-md-5.col-sm-5.np > div > picture > img');
    
        return breedImg;
    } catch (error) {
        throw new Error("Error when getting img " + error);
    }
}

async function getNote(page, selector) {
    try {
        const note = await page.evaluate((selector) => {
            // We get all the gray note and we substract it to the MAX
            let value = document.querySelector(selector).querySelectorAll('.gray');
            return 5 - value.length;
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