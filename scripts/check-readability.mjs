// Requires an existing Playwright installation; no application dependencies are added.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {});
const base = process.env.TEST_URL || 'http://127.0.0.1:4192/';
const out = process.env.EVIDENCE_DIR;
if (out) await fs.mkdir(out, {recursive: true});
const reports = [];
function contrast(fg, bg, gray = false) {
  const rgb = c => c.match(/[\d.]+/g).slice(0, 3).map(Number).map(x => x / 255);
  const lum = c => {
    let channels = rgb(c);
    if (gray) channels = Array(3).fill(channels.reduce((v, x, i) => v + x * [0.2126, 0.7152, 0.0722][i], 0));
    return channels.reduce((v, x, i) => v + (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)
      * [0.2126, 0.7152, 0.0722][i], 0);
  };
  return (Math.max(lum(fg), lum(bg)) + 0.05) / (Math.min(lum(fg), lum(bg)) + 0.05);
}

async function fixture(page) {
  await page.locator('.Ramp').first().waitFor();
  await page.evaluate(() => {
    const s = window.store;
    const Customer = s.customers[0].constructor;
    const Loading = s.loadings[0].constructor;
    const DateTime = s.loadings[0].start.constructor;
    const Delivery = s.loadings[0].deliveries[0].constructor;
    s.customers = [new Customer('DEMO-CUSTOMER-001', 'DEMO Customer', 'DEMO City', 'DEMO')];
    const rows = [['B', 2, 2], ['C', 1, 1], ['C', 22, 11], ['D', 36, 14], ['D', 6, 3],
      ['D', 7, 5], ['E', 42, 0], ['E', 29, 3]];
    s.loadings = rows.map(([ramp, pallets, picked], i) => new Loading(
      `DEMO-LOAD-${String(i + 1).padStart(3, '0')}`, s.ramps.find(r => r.description === ramp), pallets, picked,
      new DateTime(new Date('2030-01-02T08:00:00Z')), new DateTime(new Date('2030-01-02T12:00:00Z')),
      [new Delivery(s.customers[0])],
    ));
  });
  await page.getByRole('button', {name: 'Open loading DEMO-LOAD-001', exact: true}).waitFor();
}

async function assertWidth(page) {
  const m = await page.evaluate(() => ({client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth}));
  assert.ok(m.scroll <= m.client, `Document overflow ${JSON.stringify(m)}`);
  return m;
}

async function shots(page, name) {
  if (!out) return;
  // Fixed display-only samples in the original UI are replaced before capturing as well.
  await page.evaluate(() => {
    document.querySelectorAll('.operator > div').forEach(n => { n.textContent = 'DEMO Operator'; });
    document.querySelectorAll('.Details .pallets input').forEach((n, i) => {
      if (i === 2) n.value = 'DEMO TRUCK';
    });
  });
  for (const gray of [false, true]) {
    await page.evaluate(g => { document.documentElement.style.filter = g ? 'grayscale(1)' : ''; }, gray);
    await (name.endsWith('-dialog') ? page.getByRole('dialog') : page).screenshot({path: `${out}/${name}-${gray ? 'grayscale' : 'color'}.png`, fullPage: true,
      animations: 'disabled'});
  }
  await page.evaluate(() => { document.documentElement.style.filter = ''; });
}

try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 1000},
      isMobile: mobile, hasTouch: mobile});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    await fixture(page);
    const ramp = name => page.locator('.Ramp').filter({has: page.locator('header > span', {hasText: new RegExp(`^${name}$`)})});
    for (const [name, state, symbol, counts] of [
      ['B', 'Completed', '✓', ['2 of 2']], ['C', 'In progress', '◐', ['1 of 1', '11 of 22']],
      ['D', 'In progress', '◐', ['14 of 36', '3 of 6', '5 of 7']], ['E', 'Not started', '○', ['0 of 42', '3 of 29']],
    ]) {
      assert.equal((await ramp(name).locator('.RampStatus').innerText()).replace(/\s+/g, ' '), `${symbol} ${state}`);
      assert.deepEqual(await ramp(name).locator('.Loading > footer > div:first-child').allTextContents(), counts);
      const ratios = await ramp(name).locator('.bp5-progress-meter').evaluateAll(ns => ns.map(n => n.style.width));
      ratios.forEach((ratio, i) => { const [picked, total] = counts[i].split(' of ').map(Number);
        assert.ok(Math.abs(parseFloat(ratio) - picked / total * 100) < 0.001); });
    }
    assert.ok(await page.getByText('— Empty', {exact: true}).count());
    const dashboard = await assertWidth(page);
    const colors = await page.locator('.RampStatus').first().evaluate(n => {
      const c = getComputedStyle(n); return {text: c.color, background: c.backgroundColor};
    });
    const labelContrast = [false, true].map(gray => contrast(colors.text, colors.background, gray));
    assert.ok(Math.min(...labelContrast) >= 4.5);
    const mode = mobile ? 'phone' : 'desktop';
    await shots(page, `${mode}-dashboard`);
    const card = page.getByRole('button', {name: 'Open loading DEMO-LOAD-001', exact: true});
    await page.getByRole('button', {name: 'Dashboard', exact: true}).focus();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      if (await card.evaluate(n => n === document.activeElement)) break;
    }
    assert.equal(await card.evaluate(n => n === document.activeElement), true, 'Card reachable by Tab');
    const focus = await card.evaluate(n => {
      const c = getComputedStyle(n); return {color: c.outlineColor, background: c.backgroundColor, width: c.outlineWidth};
    });
    const focusContrast = [false, true].map(gray => contrast(focus.color, focus.background, gray));
    assert.ok(Math.min(...focusContrast) >= 3);
    assert.notEqual(focus.width, '0px');
    if (mobile) await card.tap(); else await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').locator('input').first().focus();
    await assertWidth(page);
    // Both existing editable controls still update the same model in memory.
    await page.locator('.Details .ramp-button').filter({hasText: /^C/}).click();
    await page.waitForFunction(() => window.store.loadings[0].ramp.description === 'C');
    const slider = page.getByRole('slider');
    await slider.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => window.store.loadings[0].duration === 4.5);
    await shots(page, `${mode}-dialog`);
    const finalTime = page.locator('.Details .times input').last();
    await finalTime.scrollIntoViewIfNeeded();
    await finalTime.focus();
    if (mobile) assert.ok(await page.locator('.Details .bp5-dialog-body').evaluate(n => n.scrollTop > 0));
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({state: 'hidden'});
    if (!mobile) assert.equal(await card.evaluate(n => n === document.activeElement), true);
    // Space opens a card too, without triggering page scrolling.
    await card.focus(); await page.keyboard.press('Space');
    await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').locator('input').first().focus();
    await page.getByRole('button', {name: 'Close', exact: true}).last().click();
    await page.getByRole('dialog').waitFor({state: 'hidden'});
    await page.getByRole('button', {name: 'Loadings', exact: true}).click();
    await assertWidth(page);
    const scroller = page.getByRole('region', {name: 'Loadings table'});
    const scroll = await scroller.evaluate(n => ({client: n.clientWidth, scroll: n.scrollWidth, overflow: getComputedStyle(n).overflowX}));
    assert.equal(scroll.overflow, 'auto');
    if (mobile) {
      assert.ok(scroll.scroll > scroll.client);
      await scroller.focus(); await page.keyboard.press('ArrowRight');
      await page.waitForFunction(() => document.querySelector('.LoadingsTableScroll').scrollLeft > 0);
      await scroller.evaluate(n => {n.scrollLeft = n.scrollWidth;});
      assert.ok(await scroller.evaluate(n => n.scrollLeft > 0));
    }
    await shots(page, `${mode}-table`);
    const row = page.getByRole('button', {name: 'Open loading DEMO-LOAD-003', exact: true});
    await row.focus(); await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').locator('input').first().focus(); await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({state: 'hidden'});
    await page.getByRole('button', {name: 'Add loading', exact: true}).click();
    await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').locator('input').first().focus(); await assertWidth(page);
    await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state: 'hidden'});
    // Width matrix checks the document rather than the expanded mobile layout viewport.
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({width, height: 1000}); await assertWidth(page);
      await page.getByRole('button', {name: 'Dashboard', exact: true}).click(); await assertWidth(page);
      await page.getByRole('button', {name: 'Open loading DEMO-LOAD-001', exact: true}).click();
      await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').locator('input').first().focus(); await assertWidth(page);
      await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state: 'hidden'});
      await page.getByRole('button', {name: 'Loadings', exact: true}).click();
    }
    assert.deepEqual(errors, []);
    reports.push({mode, dashboard, scroll, widths: '320–1440', labelContrast, focusContrast, colors, focus, errors, result: 'PASS'});
    await context.close();
  }
  console.log(JSON.stringify({browser: await browser.version(), reports}, null, 2));
} finally { await browser.close(); }
