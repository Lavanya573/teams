import { asset } from '../config/site'

// IMPORTANT: no real project case studies were supplied, so these are clearly labelled CONCEPT PROJECTS.
// They reuse the service imagery from the live site. Replace each entry with a real project:
//   set concept: false, add real image/video, client, challenge, approach, deliverables, outcome (only if verified).
export const projects = [
  {
    slug: 'concept-residential-walkthrough', title: 'Residential tower walkthrough', category: '3D Walkthroughs', service: '3d-walkthroughs',
    concept: true, image: asset('service-3d-walkthroughs.webp'), ratio: '4 / 5',
    overview: 'A concept brief showing how a residential development could be presented through an immersive walkthrough film.',
    challenge: 'Help buyers understand a development before it is built.',
    approach: 'Photoreal 3D visualization of exteriors, amenities and interiors, edited into a guided walkthrough.',
    deliverables: ['Walkthrough film', 'Exterior and interior stills'],
  },
  {
    slug: 'concept-product-commercial', title: 'Product launch commercial', category: 'TVC Films', service: 'tvc-films',
    concept: true, image: asset('service-tvc-films.webp'), ratio: '16 / 10',
    overview: 'A concept brief for a launch commercial, from script to final delivery.',
    challenge: 'Introduce a new product with a clear, memorable story.',
    approach: 'Concept development, production and post-production handled by one team.',
    deliverables: ['TV commercial', 'Cut-downs for digital'],
  },
  {
    slug: 'concept-workflow-automation', title: 'Content workflow automation', category: 'AI Innovation', service: 'ai-innovation',
    concept: true, image: asset('service-content-creation.webp'), ratio: '1 / 1',
    overview: 'A concept brief for using AI to speed up repetitive content and reporting work.',
    challenge: 'Reduce manual effort in recurring content tasks.',
    approach: 'Map the workflow, automate the repeatable steps, keep people in charge of decisions.',
    deliverables: ['Workflow design', 'Automation setup'],
  },
  {
    slug: 'concept-identity-system', title: 'Identity system for a new brand', category: 'Branding', service: 'branding',
    concept: true, image: asset('service-branding.webp'), ratio: '16 / 10',
    overview: 'A concept brief covering logo, strategy and brand applications for a new business.',
    challenge: 'Create an identity that is distinctive and consistent across touchpoints.',
    approach: 'Strategy first, then logo, colour, typography and applications.',
    deliverables: ['Logo suite', 'Brand guidelines'],
  },
  {
    slug: 'concept-corporate-website', title: 'Conversion-focused corporate website', category: 'Websites', service: 'website-ui-ux-design',
    concept: true, image: asset('service-ui-ux.webp'), ratio: '4 / 5',
    overview: 'A concept brief for a responsive website designed around enquiries.',
    challenge: 'Turn visitors into qualified leads.',
    approach: 'UX structure, UI design and a responsive build focused on a clear enquiry path.',
    deliverables: ['UX flows', 'UI design', 'Responsive website'],
  },
  {
    slug: 'concept-growth-campaign', title: 'Search and social growth programme', category: 'Digital Marketing', service: 'digital-marketing',
    concept: true, image: asset('service-digital-marketing.webp'), ratio: '1 / 1',
    overview: 'A concept brief combining SEO, social media and paid campaigns.',
    challenge: 'Increase brand visibility with measurable activity.',
    approach: 'Channel strategy, content calendar and campaign optimisation.',
    deliverables: ['Channel strategy', 'Campaign creative'],
  },
]

export const categories = ['All Work', '3D Walkthroughs', 'TVC Films', 'AI Innovation', 'Branding', 'Websites', 'Digital Marketing']
export const getProject = (slug) => projects.find((p) => p.slug === slug)
