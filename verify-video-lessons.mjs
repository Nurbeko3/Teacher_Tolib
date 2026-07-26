import { chromium } from 'playwright'

const BASE = 'http://localhost:5174'

const browser = await chromium.launch()
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()) })

// Seed admin session before first navigation
await page.goto(BASE + '/')
await page.evaluate(() => {
  localStorage.setItem('et_session', JSON.stringify({ phone: '+998991231111', role: 'SUPER_ADMIN', firstName: 'Admin', lastName: '' }))
})

// --- Admin: create a video lesson ---
await page.goto(BASE + '/admin/video-lessons')
await page.waitForTimeout(1200)
await page.screenshot({ path: '/tmp/admin-video-lessons-empty.png' })

await page.click('text=Add Video')
await page.waitForTimeout(300)
await page.selectOption('select', 'listening')
await page.fill('input[placeholder*="IELTS Listening"]', 'Playwright Test — Listening Basics')
await page.fill('textarea', 'Automated verification video entry')
await page.fill('input[placeholder*="youtube.com/watch"]', 'https://youtu.be/dQw4w9WgXcQ')
await page.waitForTimeout(500)
await page.screenshot({ path: '/tmp/admin-video-lessons-modal.png' })
await page.click('text=Add Video >> nth=1').catch(() => {})
// fallback: click the submit button specifically (last "Add Video" in modal)
const buttons = await page.$$('button:has-text("Add Video")')
if (buttons.length > 1) await buttons[buttons.length - 1].click()
await page.waitForTimeout(1000)
await page.screenshot({ path: '/tmp/admin-video-lessons-after-add.png' })

// --- Public: IELTS Listening video lessons page ---
await page.goto(BASE + '/ielts/listening/video-lessons')
await page.waitForTimeout(1500)
await page.screenshot({ path: '/tmp/public-video-lessons-listening.png' })

const cardCount = await page.locator('button:has(img)').count()
console.log('RESULT public card count:', cardCount)

if (cardCount > 0) {
  await page.locator('button:has(img)').first().click()
  await page.waitForTimeout(1200)
  await page.screenshot({ path: '/tmp/public-video-player-modal.png' })
  const iframeCount = await page.locator('iframe').count()
  console.log('RESULT iframe count after click:', iframeCount)
}

console.log('RESULT page/console errors:', JSON.stringify(errors))

await browser.close()
