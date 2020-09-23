async function getBreedLinks(page) {
    const breedLinks = await page.evaluate((selector) => {
        const breedNodeList = document.querySelectorAll(selector);
        const breeds = [...breedNodeList];
        return breeds.map(link => link.href, );
    }, '#all > div.racesList > div > a');
    
    return breedLinks;
}

async function getTextContent(page, selector) {
    const text = await page.evaluate((selector) => {
        let content = document.querySelector(selector);
        return content.textContent;
    }, selector);
    
    return text.trim();
}

async function getBreedImg(page) {
    const breedImg = await page.evaluate((selector) => {
        let img = document.querySelector(selector);
        return img.src;
    }, '#hab > div > div.row.parent > div.col-md-8.col-md-8-c > article > div > div.col-md-5.col-sm-5.np > div > picture > img');
    
    return breedImg;
}

async function getNote(page, selector) {
    const note = await page.evaluate((selector) => {
        // We get all the gray note and we substract it to the MAX
        let value = document.querySelector(selector).querySelectorAll('.gray');
        return 5 - value.length;
    }, selector);

    return note;
}

module.exports = {
    getBreedLinks,
    getTextContent,
    getBreedImg,
    getNote
};