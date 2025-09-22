export type VendorCompany = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  services: string[];
  coverageAreas?: string[];
  certifications?: string[];
  logo: string;
};

export type Provider = {
  id: string;
  name: string;
  service: string;
  rating: string;
  reviews: string;
  description: string;
  avatar: string;
  vendorId: string;
  location?: string;
  price?: number;
  certifications?: string[];
  availability?: string[];
  services?: string[];
  clientReviews?: Review[]; // New: Array of client reviews
};

export type Review = {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  timestamp: number;
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const vendorsData: Record<string, VendorCompany> = {
  sparkle_clean: {
    id: 'sparkle_clean',
    name: 'Kimalle Puhdistus Oy',
    rating: 4.8,
    reviews: 520,
    description:
      'Premium home cleaning company specializing in deep cleans and organization. Trusted by busy families.', // Reverted to English
    services: ['Home Cleaning', 'Deep Cleaning', 'Organization'], // Reverted to English
    coverageAreas: ['Helsinki', 'Espoo', 'Vantaa'], // Finnish cities
    certifications: ['Licensed', 'Insured'],
    logo: 'https://placehold.co/80x80/fee2e2/ef4444?text=SC',
  },
  appliance_pros: {
    id: 'appliance_pros',
    name: 'Kodinkone Gurut Oy',
    rating: 4.7,
    reviews: 190,
    description:
      'Certified technicians for repair and maintenance of common household appliances.', // Reverted to English
    services: ['Appliance Repair', 'Maintenance'], // Reverted to English
    coverageAreas: ['Helsinki', 'Vantaa'], // Finnish cities
    certifications: ['Certified', 'Warranty Partner'],
    logo: 'https://placehold.co/80x80/dbeafe/3b82f6?text=AP',
  },
};

export const providers: Record<string, Provider> = {
  jane: {
    id: 'jane',
    name: 'Johanna',
    service: 'Home Cleaning',
    rating: '4.8',
    reviews: '234',
    description:
      'Johanna is a professional cleaner, specializing in deep cleaning and organization. She pays attention to detail, ensuring your home is spotless.', // Reverted to English
    avatar: 'https://placehold.co/80x80/e0e7ff/4f46e5?text=Jane',
    vendorId: 'sparkle_clean',
    location: 'Espoo',
    price: 200,
    certifications: ['Background Check'],
    availability: ['Mon', 'Wed', 'Fri'],
    clientReviews: [
      { id: 'r1', reviewerName: 'Aino', rating: 5, comment: 'Johanna did an outstanding job! My home has never been cleaner. Highly recommend her deep cleaning service.', timestamp: Date.now() - 3600000 * 24 * 7 }, // Reverted to English
      { id: 'r2', reviewerName: 'Mika', rating: 5, comment: 'Punctual, professional, and very thorough. Johanna is a gem!', timestamp: Date.now() - 3600000 * 24 * 14 }, // Reverted to English
    ],
  },
  mike: {
    id: 'mike',
    name: 'Mikko',
    service: 'Home Cleaning',
    rating: '4.6',
    reviews: '112',
    description:
      'Mikko offers quick and efficient cleaning services for apartments and small homes. He is reliable and flexible to your schedule.', // Reverted to English
    avatar: 'https://placehold.co/80x80/f1f5f9/4f46e5?text=Mike',
    vendorId: 'sparkle_clean',
    location: 'Vantaa',
    price: 180,
    certifications: ['Licensed'],
    availability: ['Tue', 'Thu'],
    clientReviews: [
      { id: 'r3', reviewerName: 'Saara', rating: 4, comment: 'Mikko was good, arrived on time and did a solid job. Will book again.', timestamp: Date.now() - 3600000 * 24 * 10 }, // Reverted to English
    ],
  },
  sarah: {
    id: 'sarah',
    name: 'Saara',
    service: 'Home Cleaning',
    rating: '4.9',
    reviews: '315',
    description:
      'Saara specializes in eco-friendly cleaning, using only organic and natural products. Perfect for families with pets or young children.', // Reverted to English
    avatar: 'https://placehold.co/80x80/e0e7ff/4f46e5?text=Sarah',
    vendorId: 'sparkle_clean',
    location: 'Helsinki',
    price: 220,
    certifications: ['Eco Certified', 'Background Check'],
    availability: ['Weekend'],
  },
  other_service: {
    id: 'other_service',
    name: 'Leo',
    service: 'Appliance Repair',
    rating: '4.7',
    reviews: '89',
    description:
      'Leo is an experienced technician who can fix most common home appliances quickly and affordably. He is certified and trustworthy.', // Reverted to English
    avatar: 'https://placehold.co/80x80/f1f5f9/4f46e5?text=Leo',
    vendorId: 'appliance_pros',
    location: 'Espoo',
    price: 260,
    certifications: ['Certified Technician'],
    availability: ['Mon', 'Tue', 'Thu'],
    clientReviews: [
      { id: 'r4', reviewerName: 'Janne', rating: 5, comment: 'Leo fixed my fridge in no time! Very knowledgeable and friendly.', timestamp: Date.now() - 3600000 * 24 * 5 }, // Reverted to English
      { id: 'r5', reviewerName: 'Elina', rating: 4, comment: 'Good service, a bit pricey but worth it for the quick repair.', timestamp: Date.now() - 3600000 * 24 * 12 }, // Reverted to English
    ],
  },
};

export const servicesData: Record<string, ServiceCategory> = {
  home_cleaning: {
    id: 'home_cleaning',
    name: 'Home Cleaning',
    description:
      'Standard and deep home cleaning services for apartments and houses.',
    icon: 'https://placehold.co/40x40/f1f5f9/4f46e5?text=Clean',
  },
  appliance_repair: {
    id: 'appliance_repair',
    name: 'Appliance Repair',
    description: 'Repair and maintenance for common household appliances.',
    icon: 'https://placehold.co/40x40/f1f5f9/4f46e5?text=Repair',
  },
  errands: {
    id: 'errands',
    name: 'Errand Service',
    description: 'Personal errands, delivery, and courier tasks.',
    icon: 'https://placehold.co/40x40/f1f5f9/4f46e5?text=Errand',
  },
  gardening: {
    id: 'gardening',
    name: 'Gardening',
    description: 'Garden maintenance, planting, and landscaping tasks.',
    icon: 'https://placehold.co/40x40/f1f5f9/4f46e5?text=Garden',
  },
};



