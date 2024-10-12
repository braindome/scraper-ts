"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrape() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://www.metal-archives.com/bands/moonsorrow/89";
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url);
        const bandInfo = yield page.evaluate(() => {
            var _a, _b;
            const bandStats = document.querySelector("#band_stats");
            if (!bandStats)
                return null;
            const getTextContent = (dtText) => {
                var _a, _b;
                const dtElements = bandStats.querySelectorAll("dt");
                for (const dt of dtElements) {
                    if (((_a = dt.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === dtText) {
                        const dd = dt.nextElementSibling;
                        return dd ? (_b = dd.textContent) === null || _b === void 0 ? void 0 : _b.trim() : "Not found";
                    }
                }
                return "Not found";
            };
            return {
                bandName: ((_b = (_a = document.querySelector("#band_info h1")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "Band not found",
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
        yield browser.close();
    });
}
scrape();
