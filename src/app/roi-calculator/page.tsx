'use client';
import { useState } from "react";

import SiteLayout from "@/components/layout/SiteLayout";


export default function ROICalculator() {
  const [step] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    practiceName: "",
    practiceEmail: "",
    phoneNumber: "",
    industry: "",
    pms: "",
    offices: 0,
    patientsPerWeek: 0,
    noShows: 0,
    avgBilling: 100,
  });


  return (
    <SiteLayout>
      {step === 1 && (
        <div className="min-h-screen bg-blue-50">
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

            {/* PMS */}
            <div className="mb-6">
              <label htmlFor="pms" className="block font-semibold mb-2">
                Select your PMS
              </label>
              <select
                id="pms"
                value={formData.pms}
                onChange={(e) =>
                  setFormData({ ...formData, pms: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select PMS</option>
                <option value="Dentrix">Dentrix</option>
                <option value="Eaglesoft">Eaglesoft</option>
              </select>
            </div>

            {/* Offices */}
            <div className="mb-6">
              <label htmlFor="offices" className="block font-semibold mb-2">
                How many offices do you have?
              </label>
              <input
                id="offices"
                type="number"
                value={formData.offices}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    offices: Number.parseInt(e.target.value) || 0,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Patients */}
            <div className="mb-6">
              <label htmlFor="patients" className="block font-semibold mb-2">
                Patients per week
              </label>
              <input
                id="patients"
                type="range"
                min="0"
                max="500"
                value={formData.patientsPerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    patientsPerWeek: Number.parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* No Shows */}
            <div className="mb-6">
              <label htmlFor="noShows" className="block font-semibold mb-2">
                Weekly no-shows
              </label>
              <input
                id="noShows"
                type="range"
                min="0"
                max="100"
                value={formData.noShows}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noShows: Number.parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* Billing */}
            <div className="mb-6">
              <label htmlFor="billing" className="block font-semibold mb-2">
                Avg billing per patient
              </label>
              <input
                id="billing"
                type="range"
                min="0"
                max="2500"
                value={formData.avgBilling}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    avgBilling: Number.parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

          </div>
        </div>
      )}
    </SiteLayout>
  );
}