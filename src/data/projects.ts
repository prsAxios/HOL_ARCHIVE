export interface Project {
  id: string
  city: string
  country: string
  lat: number
  lng: number
  title: string
  subtitle: string
  year: string
  category: string
  description: string
  photos: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'mumbai-01',
    city: 'Mumbai',
    country: 'India',
    lat: 19.076,
    lng: 72.8777,
    title: 'The Oberoi Grand Gala',
    subtitle: 'Luxury Wedding · 450 Guests',
    year: '2024',
    category: 'Hospitality',
    description:
      'A three-day luxury wedding experience at The Oberoi, Mumbai. Full hospitality management, custom décor curation, and seamless guest concierge across every touchpoint from arrival to farewell.',
    photos: ['/images/rony.png', '/images/team-1.jpg', '/images/team-2.jpg'],
  },
  {
    id: 'delhi-01',
    city: 'New Delhi',
    country: 'India',
    lat: 28.6139,
    lng: 77.209,
    title: 'Imperial Corporate Summit',
    subtitle: 'Corporate Event · 800 Delegates',
    year: '2024',
    category: 'Operations',
    description:
      'End-to-end operations management for a high-profile corporate summit at The Imperial Hotel. Precision scheduling, multi-vendor coordination, and real-time performance tracking throughout.',
    photos: ['/images/pall2.jpg', '/images/team-3.jpg', '/images/team-5.jpg'],
  },
  {
    id: 'dubai-01',
    city: 'Dubai',
    country: 'UAE',
    lat: 25.2048,
    lng: 55.2708,
    title: 'Burj Al Arab Private Gala',
    subtitle: 'Private Gala · 200 Guests',
    year: '2023',
    category: 'Logistics',
    description:
      'Destination logistics and asset movement for an ultra-premium private gala. Global supply-chain coordination, precision arrival scheduling, and bespoke guest journey design.',
    photos: ['/images/team-6.jpg', '/images/team-4.jpg', '/images/rony.png'],
  },
  {
    id: 'london-01',
    city: 'London',
    country: 'UK',
    lat: 51.5074,
    lng: -0.1278,
    title: 'Heritage Estate Wedding',
    subtitle: 'Destination Wedding · 300 Guests',
    year: '2023',
    category: 'Hospitality',
    description:
      'Multi-day destination wedding across a private heritage estate in the English countryside. Full white-glove concierge, bespoke F&B curation, and on-ground logistics for international guests.',
    photos: ['/images/team-1.jpg', '/images/team-2.jpg', '/images/pall2.jpg'],
  },
  {
    id: 'singapore-01',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    title: 'Marina Bay Brand Launch',
    subtitle: 'Brand Event · 600 Guests',
    year: '2024',
    category: 'Operations',
    description:
      'Large-scale brand activation at Marina Bay Sands. Operational framework design, multi-zone guest flow management, and real-time coordination across production, hospitality, and logistics teams.',
    photos: ['/images/team-3.jpg', '/images/team-5.jpg', '/images/team-6.jpg'],
  },
  {
    id: 'jaipur-01',
    city: 'Jaipur',
    country: 'India',
    lat: 26.9124,
    lng: 75.7873,
    title: 'Palace Destination Wedding',
    subtitle: 'Destination Wedding · 550 Guests',
    year: '2023',
    category: 'Hospitality',
    description:
      'Four-day royal destination wedding at Samode Palace. Complete hospitality operations including guest villas, cultural event programming, and bespoke ceremonial design.',
    photos: ['/images/team-4.jpg', '/images/rony.png', '/images/team-1.jpg'],
  },
]
