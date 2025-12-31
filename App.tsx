
import React, { useState, useMemo } from 'react';
import { MOCK_CLINICS, SPECIALTIES } from './constants';
import { Clinic, Specialty, FilterOptions } from './types';
import ClinicCard from './components/ClinicCard';
import ChatBot from './components/ChatBot';
import ClinicModal from './components/ClinicModal';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | 'All'>('All');
  const [activeClinic, setActiveClinic] = useState<Clinic | null>(null);
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('nearest');
  const [activeTab, setActiveTab] = useState<'find' | 'my-bookings'>('find');

  const filteredClinics = useMemo(() => {
    let result = MOCK_CLINICS.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || c.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });

    if (sortBy === 'nearest') result.sort((a, b) => a.distance - b.distance);
    if (sortBy === 'highest-rated') result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [searchTerm, selectedSpecialty, sortBy]);

  const handleBook = (clinic: Clinic) => {
    alert(`Redirecting to booking system for ${clinic.name}...`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,3H5C3.89,3,3,3.89,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.89,2-2V5C21,3.89,20.11,3,19,3z M18,13h-5v5h-2v-5H6v-2h5V6h2v5h5V13z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
              Clinic<span className="text-blue-600">Connect</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors">
              Log In
            </button>
            <button className="text-sm font-semibold bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-50 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Your health journey, <br />
              <span className="text-blue-600">simplified.</span>
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Find and book the best clinics near you in seconds. Trusted by over 50,000 patients every month.
            </p>

            {/* Main Search Bar */}
            <div className="max-w-4xl mx-auto bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center px-4 gap-3 border-b sm:border-b-0 sm:border-r border-slate-100 py-2 sm:py-0">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search clinics by name or location..."
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 font-medium"
                />
              </div>
              
              <div className="flex-1 flex items-center px-4 gap-3 py-2 sm:py-0">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value as Specialty | 'All')}
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  <option value="All">All Specialties</option>
                  {SPECIALTIES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Find Care
              </button>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Top Recommended Clinics</h2>
                <p className="text-slate-500 text-sm">Based on your location and preferences</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setSortBy('nearest')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${sortBy === 'nearest' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Nearest
                  </button>
                  <button 
                    onClick={() => setSortBy('highest-rated')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${sortBy === 'highest-rated' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Highest Rated
                  </button>
                </div>
              </div>
            </div>

            {filteredClinics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClinics.map(clinic => (
                  <ClinicCard 
                    key={clinic.id} 
                    clinic={clinic} 
                    onViewDetails={setActiveClinic}
                    onBookAppointment={handleBook}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">No clinics found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedSpecialty('All');}}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,3H5C3.89,3,3,3.89,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.89,2-2V5C21,3.89,20.11,3,19,3z M18,13h-5v5h-2v-5H6v-2h5V6h2v5h5V13z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ClinicConnect</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <div className="text-sm">
            &copy; 2024 Clinic Connect. All rights reserved.
          </div>
        </div>
      </footer>

      <ClinicModal 
        clinic={activeClinic} 
        onClose={() => setActiveClinic(null)} 
        onBook={() => activeClinic && handleBook(activeClinic)} 
      />
      
      <ChatBot />
    </div>
  );
};

export default App;
