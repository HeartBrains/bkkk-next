/**
 * Generates /fixtures/*.json from Bkkk source TypeScript data files.
 * Run once: npx tsx scripts/generate-fixtures.ts
 */
import fs from 'fs'
import path from 'path'

const FIXTURES_DIR = path.join(process.cwd(), 'fixtures')
fs.mkdirSync(FIXTURES_DIR, { recursive: true })

// ── Exhibitions ──────────────────────────────────────────────────────────────
const exhibitions = [
  { id: '1', slug: 'nine-plus-five-works', title: { en: 'Nine Plus Five Works', th: 'Nine Plus Five Works' }, artist: { en: 'Michel Auder', th: 'มิเชล โอเดอร์' }, curator: { en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai', th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย' }, fromDate: '2024-01-12', toDate: '2024-03-10', dateDisplay: { en: '12 January 2024 - 10 March 2024', th: '12 มกราคม 2567 - 10 มีนาคม 2567' }, year: '2024', status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Opening-+Samatcha+Apaisuwan+23+COVER.jpg', gallery: ['https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Exhibition+Images-+Preecha+Pattara+31.jpg'] },
  { id: '2', slug: 'nostalgia-for-unity', title: { en: 'nostalgia for unity', th: 'ความคิดถึงสำหรับความเป็นหนึ่งเดียว' }, artist: { en: 'Korakrit Arunanondchai', th: 'กรกฤต อรุณานนท์ชัย' }, curator: { en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai', th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย' }, fromDate: '2024-05-31', toDate: '2024-10-31', dateDisplay: { en: '31 May 2024 - 31 October 2024', th: '31 พฤษภาคม 2567 - 31 ตุลาคม 2567' }, year: '2024', status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.2+nostalgia+for+unity--nostalgia+for+unity-+Samatcha+Apaisuwan+1+COVER.jpg', gallery: [] },
  { id: '3', slug: 'forever-love-soul-engine', title: { en: 'FOREVER LOVE SOUL ENGINE', th: 'ฟอร์เอเวอร์ เลิฟ โซล เอนจิน' }, artist: { en: 'Pansan Klongdee', th: 'พันธุ์สรร คล้องดี' }, curator: { en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai', th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย' }, fromDate: '2026-02-06', toDate: '2026-03-15', dateDisplay: { en: '6 February 2026 - 15 March 2026', th: '6 กุมภาพันธ์ 2569 - 15 มีนาคม 2569' }, year: '2026', status: 'current', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Samatcha+Apaisuwan+1+COVER.jpg', gallery: [] },
  { id: '4', slug: 'upcoming-exhibition-2026', title: { en: 'To Be Announced', th: 'จะประกาศในเร็วๆ นี้' }, artist: { en: 'To Be Announced', th: 'จะประกาศในเร็วๆ นี้' }, curator: { en: '', th: '' }, fromDate: '2026-04-01', toDate: '2026-06-30', dateDisplay: { en: 'April - June 2026', th: 'เมษายน - มิถุนายน 2569' }, year: '2026', status: 'upcoming', featuredImage: '', gallery: [] },
]

// ── Artists ───────────────────────────────────────────────────────────────────
const artists = [
  { id: 1, slug: 'emma-mccormick-goodhart', name: 'Emma McCormick Goodhart', nameTH: 'เอ็มมา แมคคอร์มิก กู๊ดฮาร์ท', period: 'January - February 2024', periodTH: 'มกราคม - กุมภาพันธ์ 2567', status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+4+COVER.jpg', gallery: [] },
  { id: 2, slug: 'natalie-bruck', name: 'Natalie Brück', nameTH: 'นาตาลี บรึค', period: 'July - September 2024', periodTH: 'กรกฎาคม - กันยายน 2567', status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+1+COVER.jpg', gallery: [] },
  { id: 3, slug: 'cole-lu', name: 'Cole Lu', nameTH: 'โคล ลู', period: 'October 2024', periodTH: 'ตุลาคม 2567', status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--Cole+Lu-+The+Engineers-+Kanrapee+Chokpaiboon+2+COVER.jpg', gallery: [] },
  { id: 8, slug: 'upcoming-artist-2026', name: 'To Be Announced', nameTH: 'จะประกาศในเร็วๆ นี้', period: 'April - June 2026', periodTH: 'เมษายน - มิถุนายน 2569', status: 'upcoming', featuredImage: '', gallery: [] },
]

// ── Moving Image ──────────────────────────────────────────────────────────────
const movingImage = [
  { id: '1', slug: 'infringes', title: { en: 'Infringes', th: 'การล่วงล้ำ' }, curator: { en: 'Komtouch Napattaloong', th: 'คมทัช นภัทธลอง' }, fromDate: '2024-10-23', toDate: '2024-12-22', dateDisplay: { en: '23 October 2024 - 22 December 2024', th: '23 ตุลาคม 2567 - 22 ธันวาคม 2567' }, status: 'past', featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-4.+Moving+Image+Program-4.1+Infringes--Infringes+-Andrea+Rossetti+1+COVER.jpg', gallery: [] },
  { id: '2', slug: 'shapeshifting-spaces', title: { en: 'Shapeshifting Spaces', th: 'พื้นที่แปรรูป' }, curator: { en: 'Rosalia Namsai Engchuan', th: 'โรซาเลีย นามทราย เอ็งชวน' }, fromDate: '2025-01-15', toDate: '2025-03-30', dateDisplay: { en: '15 January 2025 - 30 March 2025', th: '15 มกราคม 2568 - 30 มีนาคม 2568' }, status: 'past', featuredImage: '', gallery: [] },
  { id: '6', slug: 'upcoming-program-2026', title: { en: 'To Be Announced', th: 'จะประกาศในเร็วๆ นี้' }, curator: { en: 'Rosalia Namsai Engchuan', th: 'โรซาเลีย นามทราย เอ็งชวน' }, fromDate: '2026-05-01', toDate: '2026-07-31', dateDisplay: { en: '1 May 2026 - 31 July 2026', th: '1 พฤษภาคม 2569 - 31 กรกฎาคม 2569' }, status: 'upcoming', featuredImage: '', gallery: [] },
]

// ── Press ─────────────────────────────────────────────────────────────────────
const press = [
  { id: 1, slug: 'bkkk-opens-new-exhibition', date: 'November 22, 2025', dateTH: '22 พฤศจิกายน 2568', title: 'Bangkok Kunsthalle Opens New Exhibition', titleTH: 'บางกอก คุนสท์ฮัลเล่ เปิดนิทรรศการใหม่', link: '#', type: 'pdf' },
  { id: 2, slug: 'interview-curator', date: 'October 15, 2025', dateTH: '15 ตุลาคม 2568', title: 'Interview with Curator Mark Chearavanont', titleTH: 'บทสัมภาษณ์ภัณฑารักษ์ มาร์ค เจียรวนนท์', link: '#', type: 'article' },
]

// ── Activities (mock) ─────────────────────────────────────────────────────────
const activities = [
  { id: '1', slug: 'artist-talk-pansan', title: { en: 'Artist Talk: Pansan Klongdee', th: 'สนทนาศิลปิน: พันธุ์สรร คล้องดี' }, date: '2026-02-20', status: 'upcoming', featuredImage: '', content: { en: 'Join us for an artist talk with Pansan Klongdee.', th: 'ร่วมฟังการสนทนากับศิลปิน พันธุ์สรร คล้องดี' } },
]

// ── Blog (mock) ───────────────────────────────────────────────────────────────
const blog = [
  { id: '1', slug: 'welcome-to-bangkok-kunsthalle', title: { en: 'Welcome to Bangkok Kunsthalle', th: 'ยินดีต้อนรับสู่บางกอก คุนสท์ฮัลเล่' }, date: '2024-01-01', featuredImage: '', content: { en: 'Bangkok Kunsthalle opens its doors to the public.', th: 'บางกอก คุนสท์ฮัลเล่ เปิดประตูต้อนรับสาธารณชน' } },
]

// Write all fixtures
const write = (name: string, data: unknown) => {
  const p = path.join(FIXTURES_DIR, `${name}.json`)
  fs.writeFileSync(p, JSON.stringify(data, null, 2))
  console.log(`✅ fixtures/${name}.json`)
}

write('exhibitions', exhibitions)
write('artists', artists)
write('moving-image', movingImage)
write('press', press)
write('activities', activities)
write('blog', blog)

console.log('\nAll fixtures generated.')
