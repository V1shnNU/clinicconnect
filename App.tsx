import React, { useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { MOCK_CLINICS } from './constants';
import { Clinic, Specialty, FilterOptions } from './types';

import ClinicCard from './components/ClinicCard';
import ChatBot from './components/ChatBot';
import ClinicModal from './components/ClinicModal';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

const App: React.FC = () => {
  const navigate = useNavigate();

  // ✅ SINGLE SOURCE OF TRUTH
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedSpecialty, setSelectedSpecialty] =
    React.useState<Specialty | 'All'>('All');
  const [activeClinic, setActiveClinic] = React.useState<Clinic | null>(null);
  const [sortBy, setSortBy] =
    React.useState<FilterOptions['sortBy']>('nearest');

  const filteredClinics = useMemo(() => {
    let result = MOCK_CLINICS.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All' || c.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });

    if (sortBy === 'nearest') result.sort((a, b) => a.distance - b.distance);
    if (sortBy === 'highest-rated') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, selectedSpecialty, sortBy]);

  const handleBook = (clinic: Clinic) => {
    alert(`Redirecting to booking system for ${clinic.name}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              +
            </div>
            <span className="text-xl font-bold">
              Clinic<span className="text-blue-600">Connect</span>
            </span>
          </div>

          <div className="flex gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600"
                >
                  Log In
                </button>

                <button
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="pt-12 text-center">
                <h1 className="text-4xl sm:text-6xl font-extrabold">
                  Your health journey,
                  <br />
                  <span className="text-blue-600">simplified.</span>
                </h1>
              </section>

              <section className="max-w-7xl mx-auto px-4 py-12">
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
              </section>
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

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
