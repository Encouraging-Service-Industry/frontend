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
    name: 'Sparkle Clean Co.',
    rating: 4.8,
    reviews: 520,
    description:
      'Premium home cleaning company specializing in deep cleans and organization. Trusted by busy families.',
    services: ['Home Cleaning', 'Deep Cleaning', 'Organization'],
    coverageAreas: ['Beijing', 'Chaoyang'],
    certifications: ['Licensed', 'Insured'],
    logo: 'https://placehold.co/80x80/fee2e2/ef4444?text=SC',
  },
  appliance_pros: {
    id: 'appliance_pros',
    name: 'Appliance Pros Ltd.',
    rating: 4.7,
    reviews: 190,
    description:
      'Certified technicians for repair and maintenance of common household appliances.',
    services: ['Appliance Repair', 'Maintenance'],
    coverageAreas: ['Beijing', 'Haidian'],
    certifications: ['Certified', 'Warranty Partner'],
    logo: 'https://placehold.co/80x80/dbeafe/3b82f6?text=AP',
  },
};

export const providers: Record<string, Provider> = {
  jane: {
    id: 'jane',
    name: 'Jane',
    service: 'Home Cleaning',
    rating: '4.8',
    reviews: '234',
    description:
      'Jane is a professional cleaner, specializing in deep cleaning and organization. She pays attention to detail, ensuring your home is spotless.',
    avatar: 'https://placehold.co/80x80/e0e7ff/4f46e5?text=Jane',
    vendorId: 'sparkle_clean',
    location: 'Chaoyang, Beijing',
    price: 200,
    certifications: ['Background Check'],
    availability: ['Mon', 'Wed', 'Fri'],
  },
  mike: {
    id: 'mike',
    name: 'Mike',
    service: 'Home Cleaning',
    rating: '4.6',
    reviews: '112',
    description:
      'Mike offers quick and efficient cleaning services for apartments and small homes. He is reliable and flexible to your schedule.',
    avatar: 'https://placehold.co/80x80/f1f5f9/4f46e5?text=Mike',
    vendorId: 'sparkle_clean',
    location: 'Haidian, Beijing',
    price: 180,
    certifications: ['Licensed'],
    availability: ['Tue', 'Thu'],
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    service: 'Home Cleaning',
    rating: '4.9',
    reviews: '315',
    description:
      'Sarah specializes in eco-friendly cleaning, using only organic and natural products. Perfect for families with pets or young children.',
    avatar: 'https://placehold.co/80x80/e0e7ff/4f46e5?text=Sarah',
    vendorId: 'sparkle_clean',
    location: 'Chaoyang, Beijing',
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
      'Leo is an experienced technician who can fix most common home appliances quickly and affordably. He is certified and trustworthy.',
    avatar: 'https://placehold.co/80x80/f1f5f9/4f46e5?text=Leo',
    vendorId: 'appliance_pros',
    location: 'Beijing',
    price: 260,
    certifications: ['Certified Technician'],
    availability: ['Mon', 'Tue', 'Thu'],
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


