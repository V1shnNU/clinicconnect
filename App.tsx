import React, { useMemo, useState } from 'react';
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

  // ✅ AUTH STATE
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // ✅ SEARCH & FILTER STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialty | 'All'>('All');
  const [sortBy, setSortBy] =
    useState<FilterOptions['sortBy']>('nearest');
  const [activeClinic, setActiveClinic] = useState<Clinic | null>(null);

  // ✅ FILTER + SORT LOGIC
  const filteredClinics = useMemo(() => {
    let result = MOCK_CLINICS.filter(clinic => {
      const matchesSearch =
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All' || clinic.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });

    if (sortBy === 'nearest') {
      result.sort((a, b) => a.distance - b.distance);
    }

    if (sortBy === 'highest-rated') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedSpecialty, sortBy]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
              +
            </div>
            <span className="text-xl font-bold">
              Clinic<span className="text-blue-600">Connect</span>
            </span>
          </div>

          {!isLoggedIn ? (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Log In
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* HERO SECTION */}
              <section className="bg-gradient-to-b from-blue-50 via-white to-white py-24">
                <div className="max-w-5xl mx-auto text-center px-4">
                  <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                    Your health journey,
                    <br />
                    <span className="text-blue-600">made simple.</span>
                  </h1>

                  <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    Find trusted clinics, compare specialists, and book
                    appointments effortlessly — all in one place.
                  </p>

                  {/* SEARCH BAR */}
                  <div className="mt-12 bg-white shadow-xl rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center max-w-3xl mx-auto">
                    <input
                      type="text"
                      placeholder="Search by clinic name or location"
                      className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />

                    <select
                      className="w-full sm:w-56 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedSpecialty}
                      onChange={e =>
                        setSelectedSpecialty(e.target.value as Specialty | 'All')
                      }
                    >
                      <option value="All">All Specialties</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                    </select>

                    <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                      Find Care
                    </button>
                  </div>
                </div>
              </section>

              {/* SORT */}
              <div className="flex justify-center gap-4 my-8">
                <button
                  className={`px-5 py-2 rounded-xl font-medium ${
                    sortBy === 'nearest'
                      ? 'bg-blue-600 text-white'
                      : 'border text-gray-700'
                  }`}
                  onClick={() => setSortBy('nearest')}
                >
                  Nearest
                </button>

                <button
                  className={`px-5 py-2 rounded-xl font-medium ${
                    sortBy === 'highest-rated'
                      ? 'bg-blue-600 text-white'
                      : 'border text-gray-700'
                  }`}
                  onClick={() => setSortBy('highest-rated')}
                >
                  Highest Rated
                </button>
              </div>

              {/* CLINICS */}
              <section className="max-w-7xl mx-auto px-4 pb-16">
                {filteredClinics.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No clinics found. Try adjusting your search.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredClinics.map(clinic => (
                      <ClinicCard
                        key={clinic.id}
                        clinic={clinic}
                        onViewDetails={setActiveClinic}
                        onBookAppointment={() =>
                          alert(`Booking ${clinic.name}`)
                        }
                      />
                    ))}
                  </div>
                )}
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
        onBook={() =>
          activeClinic && alert(`Booking ${activeClinic.name}`)
        }
      />

      <ChatBot />

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-100 py-6 text-center text-sm text-gray-600">
        © 2026 ClinicConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
