import puppeteer from "puppeteer";

async function scrape() {

    const url = "https://www.metal-archives.com/bands/moonsorrow/89";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const bandInfo = await page.evaluate(() => {
        const bandStats = document.querySelector("#band_stats");
        if (!bandStats) return null;

        const getTextContent = (dtText: string) => {
            const dtElements = bandStats.querySelectorAll("dt");
            for (const dt of dtElements) {
                if (dt.textContent?.trim() === dtText) {
                    const dd = dt.nextElementSibling;
                    return dd ? dd.textContent?.trim() : "Not found";
                }
            }
            return "Not found";
        };

        return {
            bandName: document.querySelector("#band_info h1")?.textContent?.trim() || "Band not found",
            countryOfOrigin: getTextContent("Country of origin:"),
            location: getTextContent("Location:"),
            status: getTextContent("Status:"),
            formedIn: getTextContent("Formed in:"),
            genre: getTextContent("Genre:"),
            themes: getTextContent("Themes:"),
            currentLabel: getTextContent("Current label:"),
            yearsActive: getTextContent("Years active:")
        };
    });

    console.log(bandInfo);

    await browser.close();
}

scrape();