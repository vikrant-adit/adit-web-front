'use client';

import React, { useState } from 'react';

const SPECIALTIES = [
  'Acupuncturist',
  'Addiction Medicine Specialist',
  'Allergist',
  'Audiologist',
  'Bariatrician',
  'Cardiologist',
  'Chiropractor',
  'Colon and Rectal Surgeon',
  'Dentist (General)',
  'Dentist (Pediatric)',
  'Dentist (Cosmetic)',
  'Dermatologist',
  'Diagnostic Center',
  'Endocrinology and Metabolism Specialist',
  'Endodontist',
  'Gastroenterologist',
  'General Practicioner',
  'Geriatrician',
  'Hand Surgeon',
  'Hematologist',
  'Holistic Medicine Specialist',
  'Immunologist',
  'Infectious Disease Specialist',
  'Infertibility Specialist',
  'Integrative Medicine Specialist',
  'Internist',
  'Laser Eye Surgeon',
  'Medical Clinic',
  'Medical Spa',
  'Nephrologist',
  'Neurologist',
  'Neurosurgeon',
  'Nutritionist',
  'Obstetrician and Gynecologist (OBGYN)',
  'Oncologist',
  'Ophthamologist',
  'Optometrist',
  'Oral Surgeon',
  'Orthodontist',
  'Orthopedic Surgeon',
  'Osteopathic Physician',
  'Otolaryngologist',
  'Pain Management Specialist',
  'Pathologist',
  'Pediatrician',
  'Periodontist',
  'Pharmacist',
  'Plastic Surgon',
  'Podiatrist',
  'Primary Care Doctor',
  'Proctologist',
  'Prosthodontist',
  'Psychiatrist',
  'Psychologist',
  'Pulmonologist',
  'Radiologist',
  'Rheumatologist',
  'Sleep Medicine Specialist',
  'Sports Medicine Specialist',
  'Urgent Care',
  'Urologist',
];

export default function LocalRankChecker({
  onClose,
  campaign,
}: {
  onClose?: () => void;
  campaign?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Select Specialty');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className=" w-full max-w-3xl bg-white px-10 pt-8 pb-14 rounded-lg shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        {/* Steps */}
        <div className="flex items-center justify-center gap-6 text-orange-500">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center">
              1
            </div>
            <span className="text-sm mt-1">Step</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-px bg-orange-500" />
            <span>2</span>
            <div className="w-20 h-px bg-orange-500" />
            <span>3</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-12 text-center text-orange-500 text-2xl font-semibold">
          Find Your Practice
        </h2>

        {/* Dropdown */}
        <div className="mt-14 relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between pb-2 border-b border-black text-lg"
          >
            <span>{selected}</span>
            <span className="text-sm">⌄</span>
          </button>

          {open && (
            <ul className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-white border shadow-md rounded-md">
              {SPECIALTIES.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
