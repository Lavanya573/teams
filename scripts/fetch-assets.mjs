// Downloads the original Teamworks brand assets into public/visuals so you can self-host them.
// Run on your own machine:  npm run fetch-assets
// Then set VITE_ASSET_BASE=/visuals in .env.local and rebuild.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const BASE = 'https://www.eteamworks.com/visuals/'
const files = [
  'teamworks-logo-clean.png',
  'teamworks-logo.png',
  'service-3d-walkthroughs.webp',
  'service-tvc-films.webp',
  'service-content-creation.webp',
  'service-branding.webp',
  'service-ui-ux.webp',
  'service-digital-marketing.webp',
  ...[
    'aparna','ramky','rajapushpa','credai','suchirindia','gvk','sbi','tata','videocon','airtel',
    'microsoft','nsl-group','nabard','mnr','tech-mahindra','coromandel','bambino','big-c','adp',
    'apollo-hospitals','dr-reddys','mahidhara','johnson-johnson','iclean-takasago','maruthi',
    'annie-besant','corteva',
  ].map((n) => `brand-logos/${n}.png`),
]

let ok = 0
for (const f of files) {
  try {
    const res = await fetch(BASE + f)
    if (!res.ok) throw new Error(res.status)
    const out = join('public', 'visuals', f)
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, Buffer.from(await res.arrayBuffer()))
    ok++
    console.log('saved', f)
  } catch (e) {
    console.warn('FAILED', f, String(e.message || e))
  }
}
console.log(`\nDone: ${ok}/${files.length} files saved to public/visuals`)
