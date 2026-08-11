import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const section = document.querySelector('#projects');
  const container = section?.querySelector('.project-carousel-container');
  const items = container ? Array.from(container.querySelectorAll(':scope > *')) : [];
  const card = container?.querySelector('.project-card');
  return {
    containerClass: container?.className,
    containerDisplay: container ? getComputedStyle(container).display : null,
    gridCols: container ? getComputedStyle(container).gridTemplateColumns : null,
    childCount: items.length,
    children: items.map(el => ({ cls: el.className, tag: el.tagName })),
    cardCount: container?.querySelectorAll('.project-card').length ?? null,
    sectionHTML: section?.innerHTML.slice(0, 500),
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
