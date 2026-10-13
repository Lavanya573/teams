import { asset } from '../config/site'

export const blogCategories = [
  'All',
  '3D Walkthroughs',
  'TVC Films',
  'AI Innovation',
  'Branding',
  'Website UI/UX Design',
  'Digital Marketing',
]

export const articles = [
  {
    slug: 'why-every-real-estate-project-needs-a-3d-walkthrough',
    title: 'Why Every Real Estate Project Needs a 3D Walkthrough',
    category: '3D Walkthroughs',
    date: '20 Jul 2026',
    readTime: '10 min read',
    image: asset('service-3d-walkthroughs.webp'),
  },
  {
    slug: 'how-corporate-videos-help-businesses-grow',
    title: 'How Corporate Videos Help Businesses Grow',
    category: 'TVC Films',
    date: '20 Jul 2026',
    readTime: '3 min read',
    image: asset('service-tvc-films.webp'),
  },
  {
    slug: 'how-to-make-a-tv-commercial-step-by-step-tvc-production-guide',
    title: 'How to Make a TV Commercial: Step-by-Step TVC Production Guide',
    category: 'AI Innovation',
    date: '20 Jul 2026',
    readTime: '9 min read',
    image: 'https://www.eteamworks.com/agency-services/tvc-films/images/tvc_hero_camera.jpg',
  },
  {
    slug: 'how-professional-branding-helps-businesses-stand-out',
    title: 'How Professional Branding Helps Businesses Stand Out',
    category: 'Branding',
    date: '20 Jul 2026',
    readTime: '5 min read',
    image: asset('service-branding.webp'),
  },
  {
    slug: 'how-a-professional-website-helps-your-business-succeed',
    title: 'How a Professional Website Helps Your Business Succeed',
    category: 'Website UI/UX Design',
    date: '20 Jul 2026',
    readTime: '7 min read',
    image: asset('service-ui-ux.webp'),
  },
  {
    slug: 'why-digital-marketing-is-essential-for-small-and-medium-businesses',
    title: 'Why Digital Marketing Is Essential for Small and Medium Businesses',
    category: 'Digital Marketing',
    date: '20 Jul 2026',
    readTime: '9 min read',
    image: asset('service-digital-marketing.webp'),
  },
].map((article) => ({
  ...article,
  url: `https://www.eteamworks.com/blog/${article.slug}`,
}))