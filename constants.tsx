
import { Clinic, Specialty } from './types';

export const SPECIALTIES: Specialty[] = [
  'General Physician',
  'Dentist',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
  'Ophthalmologist'
];

export const MOCK_CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'City Smile Dental Center',
    specialty: 'Dentist',
    address: '123 Health Ave, Downtown',
    rating: 4.8,
    reviews: 124,
    hours: '09:00 AM - 06:00 PM',
    distance: 1.2,
    image: 'https://picsum.photos/seed/clinic1/600/400',
    description: 'Premier dental care in the heart of the city, specializing in cosmetic and pediatric dentistry.',
    doctors: [
      { id: 'd1', name: 'Dr. Sarah Johnson', role: 'Chief Dentist', experience: '12 years', image: 'https://picsum.photos/seed/doc1/200/200' },
      { id: 'd2', name: 'Dr. Mark Wilson', role: 'Orthodontist', experience: '8 years', image: 'https://picsum.photos/seed/doc2/200/200' }
    ]
  },
  {
    id: '2',
    name: 'HeartBeat Cardiology Clinic',
    specialty: 'Cardiologist',
    address: '456 Medical Plaza, Westside',
    rating: 4.9,
    reviews: 89,
    hours: '08:00 AM - 05:00 PM',
    distance: 3.5,
    image: 'https://picsum.photos/seed/clinic2/600/400',
    description: 'State-of-the-art cardiac diagnostics and treatment center.',
    doctors: [
      { id: 'd3', name: 'Dr. Emily Chen', role: 'Senior Cardiologist', experience: '15 years', image: 'https://picsum.photos/seed/doc3/200/200' }
    ]
  },
  {
    id: '3',
    name: 'DermaGlow Skin Institute',
    specialty: 'Dermatologist',
    address: '789 Skin Care Way, North Hills',
    rating: 4.7,
    reviews: 210,
    hours: '10:00 AM - 07:00 PM',
    distance: 2.1,
    image: 'https://picsum.photos/seed/clinic3/600/400',
    description: 'Specializing in medical dermatology and advanced aesthetic treatments.',
    doctors: [
      { id: 'd4', name: 'Dr. James Rodriguez', role: 'Dermatologist', experience: '10 years', image: 'https://picsum.photos/seed/doc4/200/200' }
    ]
  },
  {
    id: '4',
    name: 'TinyTots Pediatric Clinic',
    specialty: 'Pediatrician',
    address: '321 Family Lane, South End',
    rating: 4.6,
    reviews: 156,
    hours: '09:00 AM - 04:00 PM',
    distance: 0.8,
    image: 'https://picsum.photos/seed/clinic4/600/400',
    description: 'A friendly and warm environment for your children’s health needs.',
    doctors: [
      { id: 'd5', name: 'Dr. Lisa Parker', role: 'Lead Pediatrician', experience: '20 years', image: 'https://picsum.photos/seed/doc5/200/200' }
    ]
  },
  {
    id: '5',
    name: 'General Health Hub',
    specialty: 'General Physician',
    address: '555 Wellness Blvd, Central',
    rating: 4.5,
    reviews: 340,
    hours: '24 Hours',
    distance: 1.5,
    image: 'https://picsum.photos/seed/clinic5/600/400',
    description: 'Your one-stop destination for all general health consultations and checkups.',
    doctors: [
      { id: 'd6', name: 'Dr. Robert Brown', role: 'Family Doctor', experience: '18 years', image: 'https://picsum.photos/seed/doc6/200/200' }
    ]
  }
];
