// Single source of truth for company facts. All values come from https://www.eteamworks.com
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.eteamworks.com').replace(/\/$/, '')
const RAW_BASE = (import.meta.env.VITE_ASSET_BASE || 'https://www.eteamworks.com/visuals').replace(/\/$/, '')

// asset('service-branding.webp') -> full URL (remote by default, local after `npm run fetch-assets`)
export const asset = (file) => `${RAW_BASE}/${file}`

export const company = {
  name: 'Teamworks Creative Solutions',
  short: 'Teamworks',
  since: 2001,
  email: 'info@eteamworks.com',
  phone: '+91 9100951234',
  phoneHref: 'tel:+919100951234',
  // NOTE: the live site shows two different addresses (header: Tagore Tower, footer: SV Chambers).
  // The footer address is used here. Confirm the correct one with the client.
  address: ['3rd Floor, SV Chambers,', 'Kavuri Hills, Madhapur,', 'Hyderabad – 500033,', 'Telangana, India'],
  social: [
    { label: 'YouTube', href: 'https://www.youtube.com/@teamworkscs' },
    { label: 'X', href: 'https://x.com/Teamworkscs' },
    { label: 'Instagram', href: 'https://www.instagram.com/teamworks_cs/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Teamworkscs' },
    { label: 'Google', href: 'https://share.google/RFaq38RxpxziuVv3M' },
  ],
  stats: [
    { value: '25+', label: 'Years of experience' },
    { value: '1000+', label: 'Projects delivered' },
    { value: '100+', label: 'Global clients' },
  ],
  // Pages that exist on the live site but are not rebuilt here yet — linked externally so nothing is lost.
  external: {
    virtualTour: 'https://www.eteamworks.com/360',
    blog: 'https://www.eteamworks.com/blog',
    privacy: 'https://www.eteamworks.com/privacy-policy',
  },
}

export const logoSources = [asset('teamworks-logo-clean.png'), asset('teamworks-logo.png')]

export const process = [
  { title: 'Discover', text: 'Understanding your business, goals, and audience to build a foundation for success.' },
  { title: 'Strategize', text: 'Creating a clear roadmap for success, aligning creative vision with measurable objectives.' },
  { title: 'Design & Develop', text: 'Crafting visually stunning and functional solutions that engage, convert, and inspire.' },
  { title: 'Launch & Optimize', text: 'Delivering and continuously improving performance to keep your brand ahead of the curve.' },
]

export const coreValues = [
  {
    title: 'Purpose',
    text: 'We aim to make an impact with everything we do. Forward-thinking clients understand that immersive experiences should suit their brand and help them meet their business objectives.',
  },
  {
    title: 'Commitment',
    text: 'Our proactive approach, can-do attitude, and motivation keep us learning. We believe in attention to detail and bring dedication to every project, regardless of size or budget.',
  },
  {
    title: 'Trust',
    text: 'We provide solutions that fit our clients’ purpose and mission, building lasting professional relationships through mutual respect and open communication.',
  },
  {
    title: 'Professionalism',
    text: 'We strive for excellence through operational efficiency, creativity, and innovation, continually improving the work we deliver.',
  },
]

export const faqs = [
  { q: 'What services does Teamworks offer?', a: 'We provide end-to-end creative and digital solutions including 3D walkthroughs, TVC films, branding, UI/UX design, and digital marketing to help businesses grow and stand out.' },
  { q: 'How can Teamworks help my business grow?', a: 'We combine creative design, advanced technology, and data-driven marketing strategies to build strong brand presence, attract the right audience, and generate measurable results.' },
  { q: 'Do you offer customized solutions for different industries?', a: 'Yes, we tailor our services based on your industry, business goals, and target audience to deliver solutions that are effective and result-oriented.' },
  { q: 'What makes Teamworks different from other agencies?', a: 'With over two decades of experience and an AI-driven approach, we focus on creative, innovative, and performance-based solutions that impact business growth.' },
  { q: 'How can I get started with Teamworks?', a: 'Contact us or request a consultation. Our team will understand your requirements and guide you with the right strategy.' },
]
