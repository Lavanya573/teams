import { asset } from '../config/site'

// Short descriptions are the company's own copy from eteamworks.com.
// `headline`, `intro`, `delivers` and `applications` are draft copy derived from those descriptions — confirm with the client.
export const services = [
  {
    slug: '3d-walkthroughs',
    title: '3D Walkthroughs',
    image: asset('service-3d-walkthroughs.webp'),
    short: 'Bring your projects to life with realistic and immersive 3D walkthroughs. Perfect for real estate, architecture, and interior presentations that leave a lasting impression.',
    headline: 'Spaces people can see before they exist.',
    intro: 'Realistic, immersive 3D walkthroughs for real estate, architecture and interior presentations.',
    delivers: ['Architectural 3D visualization', 'Walkthrough films', 'Interior and exterior renders', 'Presentation-ready visuals for sales and approvals'],
    applications: ['Real estate developments', 'Architecture presentations', 'Interior design proposals'],
    categoryLabel: '3D Walkthroughs',
  },
  {
    slug: 'tvc-films',
    title: 'TVC Films',
    image: asset('service-tvc-films.webp'),
    short: 'Create powerful brand stories with high-quality TV commercials. We handle everything from concept development to production and final delivery.',
    headline: 'Brand stories, produced end to end.',
    intro: 'High-quality TV commercials handled from concept development through production to final delivery.',
    delivers: ['Concept development', 'Production', 'Post-production and final delivery'],
    applications: ['Television commercials', 'Brand films', 'Campaign launches'],
    categoryLabel: 'TVC Films',
  },
  {
    slug: 'ai-innovation',
    title: 'AI Innovation',
    image: asset('service-content-creation.webp'),
    short: 'Apply practical AI to automate workflows, accelerate content and decisions, and build intelligent customer experiences around your business.',
    headline: 'Practical AI, built around your business.',
    intro: 'We apply AI where it is genuinely useful: automating workflows, accelerating content and decisions, and building intelligent customer experiences.',
    delivers: ['Workflow automation', 'AI-assisted content production', 'Intelligent customer experiences'],
    applications: ['Marketing and content teams', 'Customer-facing experiences', 'Internal operations'],
    categoryLabel: 'AI Innovation',
  },
  {
    slug: 'branding',
    title: 'Branding',
    image: asset('service-branding.webp'),
    short: 'Build a strong and memorable brand identity that connects with your audience. From logo design to complete brand strategy, we shape how your brand is perceived.',
    headline: 'Identity that shapes how you are perceived.',
    intro: 'From logo design to complete brand strategy, we build identities that connect with your audience.',
    delivers: ['Logo and visual identity', 'Brand strategy', 'Brand guidelines and applications'],
    applications: ['New brands', 'Rebrands', 'Product and campaign identities'],
    categoryLabel: 'Branding',
  },
  {
    slug: 'website-ui-ux-design',
    title: 'Website UI/UX Design',
    image: asset('service-ui-ux.webp'),
    short: 'Design modern, user-friendly, and conversion-focused websites. We ensure seamless user experiences that drive engagement and results.',
    headline: 'Websites designed to convert.',
    intro: 'Modern, user-friendly, conversion-focused websites with seamless user experiences.',
    delivers: ['UX structure', 'UI design', 'Responsive website design'],
    applications: ['Corporate websites', 'Landing pages', 'Lead-generation sites'],
    categoryLabel: 'Websites',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    image: asset('service-digital-marketing.webp'),
    short: 'Accelerate your business growth with data-driven digital marketing strategies including SEO, social media, and paid campaigns.',
    headline: 'Growth, driven by data.',
    intro: 'Data-driven digital marketing across SEO, social media and paid campaigns.',
    delivers: ['SEO', 'Social media marketing', 'Paid campaigns'],
    applications: ['Brand visibility', 'Lead generation', 'Ongoing growth programmes'],
    categoryLabel: 'Digital Marketing',
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
