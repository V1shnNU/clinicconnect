
export type Specialty = 'Dentist' | 'Cardiologist' | 'Dermatologist' | 'Pediatrician' | 'General Physician' | 'Orthopedic' | 'Neurologist' | 'Ophthalmologist';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
}

export interface Clinic {
  id: string;
  name: string;
  specialty: Specialty;
  address: string;
  rating: number;
  reviews: number;
  hours: string;
  distance: number;
  image: string;
  doctors: Doctor[];
  description: string;
}

export interface FilterOptions {
  specialty: Specialty | 'All';
  distance: number;
  rating: number;
  sortBy: 'nearest' | 'highest-rated' | 'open-now';
}
