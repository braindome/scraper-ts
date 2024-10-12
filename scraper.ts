import axios from "axios";
import { load } from "cheerio";

async function scrape() {
    const response = await axios.get("https://www.metal-archives.com/bands/Opeth");
    const html = response.data;
    const $ = load(html);

    const bandInfo = $("#band_info").first();
    const bandName = $(bandInfo).find("h1").text();

    console.log(bandName);
}

scrape();