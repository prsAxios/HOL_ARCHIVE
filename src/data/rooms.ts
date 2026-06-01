export interface Room {
  id: string
  title: string
  client: string
  img: string
  tagline: string
  description: string[]
  features: string[]
  price: string
  priceNote: string
  sqm: string
  occupancy: string
  bed: string
}

export const rooms: Room[] = [
  {
    id: '01',
    title: 'The Como Grand Gala',
    client: 'Destination Wedding',
    img: '/wedding_project_destination.png',
    tagline: 'An ethereal celebration on the shores of Lake Como, where history meets modern luxury.',
    description: [
      'For this landmark celebration, HOL Solutions orchestrated a multi-day experience for 200 international guests. The challenge was a logistically complex venue accessible only by water, requiring a fleet of 15 vintage mahogany boats for guest transport.',
      'The design language was "Timeless Romance" — thousands of white O’Hara roses, champagne gold accents, and a custom-built glass marquee that mirrored the lake’s surface. Every moment, from the lakeside ceremony to the midnight fireworks, was timed to the second.',
    ],
    features: [
      'Water-only logistics management',
      'Custom glass marquee installation',
      'Multi-day guest hospitality suite',
      'Curated Michelin-star catering',
      'Synchronized pyrotechnic display',
      'Private villa buyout coordination',
    ],
    price: 'Bespoke Inquiry',
    priceNote: 'full planning & logistics',
    sqm: '200 Guests',
    occupancy: 'Lake Como, Italy',
    bed: 'Destination',
  },
  {
    id: '02',
    title: 'Royal Palace Banquet',
    client: 'Grand Reception',
    img: '/wedding_project_royal_banquet.png',
    tagline: 'A majestic evening of opulence and precision in a historic royal ballroom.',
    description: [
      'The Royal Palace Banquet was a masterclass in scale and operational excellence. Managing a guest list of 500 in a Grade-I listed heritage building required meticulous floor-flow planning and a staff of 120 hospitality professionals.',
      'The aesthetic was "Midnight Majesty" — deep navy linens, antique gold cutlery, and a forest of taper candles. Our logistics team managed the installation of a 40-foot floral installation without touching the historic ceiling, showcasing our technical expertise.',
    ],
    features: [
      'Heritage site preservation management',
      'Large-scale guest flow optimization',
      'Advanced lighting and acoustics',
      'Artisanal cocktail curation',
      'High-security VIP protocol',
      'Precision timeline execution',
    ],
    price: 'Bespoke Inquiry',
    priceNote: 'operations & curation',
    sqm: '500 Guests',
    occupancy: 'London, UK',
    bed: 'Royal Gala',
  },
  {
    id: '03',
    title: 'The Desert Oasis',
    client: 'Adventure Luxury',
    img: '/wedding_hero_main.png',
    tagline: 'A high-concept celebration in the heart of the dunes, blending rugged nature with refined comfort.',
    description: [
      'Transforming a remote desert location into a five-star wedding venue required significant infrastructural logistics. HOL Solutions managed the installation of power, water, and climate-controlled environments in sub-zero night temperatures.',
      'The result was a surreal landscape of light and texture. Guests dined under a canopy of stars on low-slung silk cushions, surrounded by custom-built fire pits and sand-safe pathways. A true testament to our "Hospitality Operations Logistics" ethos.',
    ],
    features: [
      'Remote site infrastructure setup',
      'Climate-controlled marquee system',
      'Off-road transport logistics',
      'Bespoke desert glamping suites',
      'Night-sky lighting design',
      'Sustainability-focused operations',
    ],
    price: 'Bespoke Inquiry',
    priceNote: 'end-to-end management',
    sqm: '120 Guests',
    occupancy: 'Dubai, UAE',
    bed: 'Adventure Luxe',
  },
]
