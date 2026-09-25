import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_SLIDES = 14;
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;
const ANIMATION_WAIT = 1000;

async function generatePDF() {
  console.log("🚀 Starting PDF generation...");
  console.log(`📐 Resolution: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`📄 Total slides: ${TOTAL_SLIDES}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
    },
  });

  const page = await browser.newPage();

  const htmlPath = `file://${path.join(__dirname, "../../presentation/index.html")}`;
  console.log(`📂 Loading presentation from: ${htmlPath}`);
  await page.goto(htmlPath, { waitForNetworkIdle: true });

  await page.evaluate(() => {
    localStorage.clear();
  });

  await page.reload({ waitForNetworkIdle: true });
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("\n📸 Capturing slides...\n");

  const screenshots = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    console.log(`  Slide ${i + 1}/${TOTAL_SLIDES}...`);

    await new Promise(resolve => setTimeout(resolve, ANIMATION_WAIT));

    const screenshot = await page.screenshot({
      type: "png",
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
      },
    });

    screenshots.push(screenshot);

    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press("ArrowRight");
    }
  }

  await browser.close();
  console.log("\n✅ All slides captured!\n");

  console.log("📝 Generating PDF...");
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < screenshots.length; i++) {
    const pngImage = await pdfDoc.embedPng(screenshots[i]);

    const page = pdfDoc.addPage([VIEWPORT_WIDTH, VIEWPORT_HEIGHT]);

    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
    });

    console.log(`  Added slide ${i + 1}/${TOTAL_SLIDES} to PDF`);
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(
    __dirname,
    "../public/talks/confnodo/confnodo.pdf"
  );
  await fs.writeFile(outputPath, pdfBytes);

  console.log(`\n✨ PDF generated successfully!`);
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Size: ${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB\n`);
}

generatePDF().catch(error => {
  console.error("❌ Error generating PDF:", error);
  process.exit(1);
});
