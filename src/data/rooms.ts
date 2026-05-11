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
    title: 'The Meridian Penthouse',
    client: 'Residential',
    img: '/images/project-01.jpg',
    tagline: 'A 300m² penthouse overlooking Central Park, blending warm timber with cold steel.',
    description: [
      'Perched atop one of Manhattan\'s most coveted addresses, the Meridian Penthouse was conceived as a sanctuary above the city. A seven-metre wall of glass frames Central Park in every season, turning the landscape into a living artwork.',
      'Interiors are a dialogue between warmth and precision — walnut paneling, honed marble, and brushed brass fixtures. The fireplace, carved from a single block of Calacatta Viola, anchors the living space. Custom furniture in natural linen and cognac leather completes the composition.',
    ],
    features: [
      'Floor-to-ceiling park-facing glass facade',
      'Private terrace with outdoor kitchen, 45m²',
      'Calacatta Viola marble fireplace',
      'Custom walnut millwork throughout',
      'Gaggenau kitchen with walk-in pantry',
      'Smart home integration, Lutron lighting',
    ],
    price: 'From ₹7.5 Crores',
    priceNote: 'full interior design service',
    sqm: '300m²',
    occupancy: '4 bedrooms',
    bed: 'Residential',
  },
  {
    id: '02',
    title: 'Noire Restaurant',
    client: 'Hospitality',
    img: '/images/project-02.jpg',
    tagline: 'An intimate 40-seat dining room where shadow and light choreograph the evening.',
    description: [
      'Noire is a meditation on contrast — a restaurant designed to feel like stepping into a photograph. The space is wrapped in deep charcoal plaster, with exposed brick left raw and honest.',
      'Banquettes in emerald velvet line the perimeter, their plushness offset by the industrial weight of brass pendant lights overhead. Every table is a stage: focused light from custom fixtures creates intimate pools of warmth in the otherwise shadowed room.',
    ],
    features: [
      '40-seat dining room with banquet seating',
      'Custom brass pendant lighting system',
      'Charcoal plaster walls with exposed brick',
      'Emerald velvet banquettes by De Gournay',
      'Open kitchen with marble chef\'s counter',
      'Acoustic treatment for intimate dining',
    ],
    price: 'From ₹3.8 Crores',
    priceNote: 'full fit-out and styling',
    sqm: '180m²',
    occupancy: '40 seats',
    bed: 'Hospitality',
  },
  {
    id: '03',
    title: 'Aura Wellness Spa',
    client: 'Commercial',
    img: '/images/project-03.jpg',
    tagline: 'A sensory retreat using natural materials and biophilic design principles.',
    description: [
      'Aura was designed as a journey inward. From the moment guests enter, the city fades away. Natural stone walls, bamboo screens, and living plants create an environment that breathes.',
      'Each treatment room faces an interior garden planted with jasmine and ferns. The water feature at the center of the spa produces a constant, gentle sound that masks the urban world beyond. Materials were chosen for their tactile warmth — limestone, cedar, woven jute.',
    ],
    features: [
      'Six treatment rooms with garden views',
      'Central water feature with stone basin',
      'Biophilic design, 40+ living plants',
      'Natural stone and cedar throughout',
      'Custom linen treatment robes and towels',
      'Circadian lighting system',
    ],
    price: 'From ₹6.2 Crores',
    priceNote: 'design and project management',
    sqm: '450m²',
    occupancy: '6 treatment rooms',
    bed: 'Commercial',
  },
  {
    id: '04',
    title: 'The Glass House',
    client: 'Residential',
    img: '/images/project-04.jpg',
    tagline: 'A minimalist coastal retreat with floor-to-ceiling glazing and ocean views.',
    description: [
      'Sited on a cliff above the Pacific, the Glass House dissolves the boundary between interior and landscape. Every room faces the ocean. Every surface was chosen to reflect or absorb the changing coastal light.',
      'White concrete floors run throughout, their subtle warmth preventing the space from feeling clinical. A floating staircase in light oak connects the two levels without obstructing the view. The single statement sofa in natural linen sits like a sculpture against the glass.',
    ],
    features: [
      'Floor-to-ceiling glazing on ocean side',
      'White concrete heated floors throughout',
      'Floating oak staircase',
      'Minimalist kitchen with hidden appliances',
      'Outdoor terrace with infinity edge',
      'Storm-rated glass, passive ventilation',
    ],
    price: 'From ₹12 Crores',
    priceNote: 'architecture and interiors',
    sqm: '420m²',
    occupancy: '3 bedrooms',
    bed: 'Residential',
  },
  {
    id: '05',
    title: 'Steel \& Velvet Office',
    client: 'Commercial',
    img: '/images/project-05.jpg',
    tagline: 'A creative agency headquarters balancing industrial rawness with plush comfort.',
    description: [
      'This headquarters for a leading creative agency needed to embody their brand: bold, refined, and unapologetically original. The design preserves the building\'s industrial bones — exposed steel beams, raw concrete walls, polished concrete floors.',
      'Against this raw canvas, moments of luxury emerge. Plush velvet sofas in deep burgundy anchor the lounge areas. Large-format abstract art provides bursts of color. Industrial pendant lights cast warm, focused pools of light. Plants throughout add life and softness.',
    ],
    features: [
      'Open-plan workspace for 50 staff',
      'Exposed steel beams and concrete walls',
      'Burgundy velvet lounge seating',
      'Large-format art curation program',
      'Soundproofed meeting pods',
      'Rooftop terrace with city views',
    ],
    price: 'From ₹8.5 Crores',
    priceNote: 'full office redesign',
    sqm: '800m²',
    occupancy: '50 employees',
    bed: 'Commercial',
  },
  {
    id: '06',
    title: 'The Library Hotel',
    client: 'Hospitality',
    img: '/images/project-06.jpg',
    tagline: 'A 12-suite boutique hotel where every room is themed around a literary genre.',
    description: [
      'The Library Hotel transforms literature into space. Each of the twelve suites is dedicated to a genre — from Gothic to Science Fiction to Poetry — with interiors that immerse guests in the world of the page.',
      'The common areas celebrate the act of reading itself. Floor-to-ceiling bookshelves line the walls, filled with curated volumes. A leather chesterfield sofa sits before a working fireplace, brass reading lamps casting warm pools of light. Rich wood paneling and an antique Persian rug complete the atmosphere.',
    ],
    features: [
      '12 themed suites across 4 floors',
      'Floor-to-ceiling library walls',
      'Working fireplace with leather seating',
      'Brass reading lamps throughout',
      'Curated in-room book collections',
      'Rooftop reading garden',
    ],
    price: 'From ₹22 Crores',
    priceNote: 'complete hotel design',
    sqm: '1,200m²',
    occupancy: '12 suites',
    bed: 'Hospitality',
  },
]
