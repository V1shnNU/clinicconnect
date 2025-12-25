
import React from 'react';
import { Clinic } from '../types';

interface ClinicCardProps {
  clinic: Clinic;
  onViewDetails: (clinic: Clinic) => void;
  onBookAppointment: (clinic: Clinic) => void;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, onViewDetails, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={clinic.image} 
          alt={clinic.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm">
          <span className="text-yellow-500">★</span>
          <span>{clinic.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {clinic.specialty}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{clinic.name}</h3>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {clinic.address} ({clinic.distance} km)
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-600 mb-6">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {clinic.hours}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onViewDetails(clinic)}
            className="py-2.5 px-4 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Details
          </button>
          <button 
            onClick={() => onBookAppointment(clinic)}
            className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
