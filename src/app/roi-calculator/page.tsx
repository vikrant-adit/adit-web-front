'use client';
import  { useState } from "react";
import FinalCtaSection from "@/components/common/FinalCtaSection";
import roiCalImg from "../../assets/RoiCalculator/roi-calculator-heroimg.png";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";

export default function ROICalculator() {
  const [step, setStep] = useState(0);
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
    practiceSize: "",
    currentSoftwareCost: "",
    avgPatientsPerDay: "",
    hoursOnAdminTasks: "",
    employeeCount: "",
  });

  // add state to store selected provider per service
  const [serviceSelections, setServiceSelections] = useState<Record<string, string>>({});

  // replace simple services array with structured list including options
  const similarOptions = [
    "Birdeye",
    "CareCru",
    "Dear Doc",
    "Demand Force",
    "Dentrix Hub",
    "Dental Symphony",
    "Dentrix Patient Engage",
    "Doctible",
    "Enlive Forms",
    "Flex Dental",
    "Kasper",
    "Legwork",
    "Lighthouse 360",
    "DI/Modento/LocalMed",
    "M-Consent",
    "Nexhealth",
    "Opera DDS",
    "Patient Activator",
    "Patient Viewer",
    "Patient Xpress",
    "Podium",
    "Practice By Numbers",
    "Practice Mojo",
    "RecallMax",
    "Revenuse Well",
    "Simplifeye",
    "Solution Reach",
    "Swell",
    "Vyne",
    "Weave",
    "Yapi",
    "ZocDoc",
    "No Texting System",
  ];
  const services = [
    {
      key: "phones",
      label: "Phones",
      options: [
        "8x8",
        "AT&T",
        "Bell",
        "Comcast",
        "GoTo Connect",
        "Intiveo",
        "Mango",
        "Nextiva",
        "Ooma",
        "Optimum",
        "Peer Logic",
        "Revenue Well",
        "RingCentral",
        "Shaw",
        "Spectrum",
        "Verizon",
        "Weave",
      ],
    },
    {
      key: "texting",
      label: "Texting & Internal Chat",
      options: similarOptions,
    },
    {
      key: "forms",
      label: "Digital Forms",
      options: similarOptions,
    },
    {
      key: "scheduling",
      label: "Scheduling",
      options: similarOptions,
    },
    {
      key: "reminders",
      label: "Reminders",
      options: similarOptions,
    },
    {
      key: "insurance",
      label: "Insurance Verification",
      options: [
        "Vyne",
        "Zuub",
        "AirPay",
        "E-Assist",
        "Weave",
        "Practice By Numbers",
        "Solution Reach",
        "NexHealth",
        "Dental Intel",
        "RevenuWell",
        "No Vendor",
      ],
    },
    {
      key: "billing",
      label: "Billing Software",
      options: ["Adit Pay", "Dentrix", "CareCredit", "Other"],
    },
    {
      key: "analytics",
      label: "Analytics",
      options: ["Adit Analytics", "Solution A", "Solution B", "Other"],
    },
    {
      key: "reviews",
      label: "Reviews",
      options: ["Pozative", "BirdEye", "Solution X", "Other"],
    },
    {
      key: "email",
      label: "Email Campaign",
      options: ["Mailchimp", "ActiveCampaign", "Adit Email", "Other"],
    },
  ];

  const valueMonthly = '54,188';
  const valueYearly = '704,444';
  // helper to update selection
  const handleServiceChange = (key: string, value: string) => {
    setServiceSelections((prev) => ({ ...prev, [key]: value }));
  };

  // isComplete now explicitly checks for step === 3
  const isComplete = step === 4;

  return (
    <SiteLayout>
      {step === 0 && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Welcome to the
                  <br />
                  <span className="text-blue-600">Adit ROI Calculator</span>
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Ready to see how much your practice can save and grow?
                </p>
                <p className="text-lg text-gray-500 mb-8">
                  Answer a few quick questions and discover how Adit can boost
                  production, streamline operations, and simplify
                  communications, while saving big on software costs.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg w-fit"
                >
                  Let&apos;s Get Started
                </button>
              </div>
              <Image src={roiCalImg} alt="ROI calculator" width={500} height={500} />
            </div>
          </div>
        </div>
        <FinalCtaSection
          title="Ready to simplify and grow your practice?"
          description="Adit gives you all the tools you need to streamline operations, reduce costs, and keep patients engaged, all in one easy-to-use, affordable platform. Spend less time on busy work and more time delivering great patient care."
          buttonText="Book a Demo"
          buttonLink="/demo"
        />
      </div>
      )}

      {step === 1 && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Select your PMS
                </label>
                <select
                  value={formData.pms}
                  onChange={(e) =>
                    setFormData({ ...formData, pms: e.target.value })
                  }
                  className="w-full p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5rem",
                  }}
                >
                  <option value="">Select your PMS</option>
                  <option value="AbelDent">AbelDent</option>
                  <option value="ClearDent">ClearDent</option>
                  <option value="Curve">Curve</option>
                  <option value="Denticon">Denticon</option>
                  <option value="Dentrix">Dentrix</option>
                  <option value="Dentrix Ascend">Dentrix Ascend</option>
                  <option value="Eaglesoft">Eaglesoft</option>
                  <option value="Easy Dental">Easy Dental</option>
                  <option value="Open Dental">Open Dental</option>
                  <option value="PracticeWorks">PracticeWorks</option>
                  <option value="RevolutionEHR">RevolutionEHR</option>
                  <option value="Tracker">Tracker</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  How many offices do you have?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.offices}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        offices: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
                    min="0"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col">
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          offices: formData.offices + 1,
                        })
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          offices: Math.max(0, formData.offices - 1),
                        })
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                How many patients do you usually see in a week?
              </label>
              <div className="relative">
                <div className="absolute left-0 -top-8 bg-white border-2 border-blue-500 rounded-lg px-3 py-1 shadow-lg">
                  <span className="text-lg font-bold text-gray-800">
                    {formData.patientsPerWeek}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={formData.patientsPerWeek}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patientsPerWeek: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      (formData.patientsPerWeek / 500) * 100
                    }%, #e5e7eb ${
                      (formData.patientsPerWeek / 500) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>500</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                On average, how many no-shows do you have each week?
              </label>
              <div className="relative">
                <div className="absolute left-0 -top-8 bg-white border-2 border-blue-500 rounded-lg px-3 py-1 shadow-lg">
                  <span className="text-lg font-bold text-gray-800">
                    {formData.noShows}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.noShows}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      noShows: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      (formData.noShows / 100) * 100
                    }%, #e5e7eb ${
                      (formData.noShows / 100) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                What&apos;s your average billing per patient booking?
              </label>
              <div className="relative">
                <div className="absolute left-0 -top-8 bg-white border-2 border-blue-500 rounded-lg px-3 py-1 shadow-lg">
                  <span className="text-lg font-bold text-gray-800">
                    ${formData.avgBilling}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="50"
                  value={formData.avgBilling}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      avgBilling: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      (formData.avgBilling / 2500) * 100
                    }%, #e5e7eb ${
                      (formData.avgBilling / 2500) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$0</span>
                  <span>&lt;$2500</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(0)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-full transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.pms}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-16 rounded-full text-lg transition-all shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <FinalCtaSection
          title="Why Pay More, For Less?"
          description="With Adit, you get everything your practice needs in one platform at a fraction of the cost. More capabilities, more efficiency, and more growth for your practice."
          buttonText="Download Report"
          buttonLink="/demo"
        />
      </div>
      )}

      {step === 2 && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Enter Your Details to See Your Personalized ROI Score
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <input
                type="text"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                placeholder="Practice Name*"
                value={formData.practiceName}
                onChange={(e) =>
                  setFormData({ ...formData, practiceName: e.target.value })
                }
                className="p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="email"
                placeholder="Practice Email*"
                value={formData.practiceEmail}
                onChange={(e) =>
                  setFormData({ ...formData, practiceEmail: e.target.value })
                }
                className="p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="p-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Select Your Industry
            </h3>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <button
                onClick={() => setFormData({ ...formData, industry: "Dental" })}
                className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  formData.industry === "Dental"
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    d="M50 20 C30 20, 25 30, 25 40 C25 55, 35 70, 50 80 C65 70, 75 55, 75 40 C75 30, 70 20, 50 20 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35 45 L35 60 M45 48 L45 65 M55 48 L55 65 M65 45 L65 60"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-xl font-bold text-gray-900">Dental</p>
              </button>

              <button
                onClick={() =>
                  setFormData({ ...formData, industry: "Optometry" })
                }
                className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  formData.industry === "Optometry"
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <circle cx="30" cy="50" r="15" strokeLinecap="round" />
                  <circle cx="70" cy="50" r="15" strokeLinecap="round" />
                  <path
                    d="M45 50 L55 50 M15 45 L10 40 M85 45 L90 40"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-xl font-bold text-gray-900">Optometry</p>
              </button>

              <button
                onClick={() =>
                  setFormData({ ...formData, industry: "Chiropractic" })
                }
                className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  formData.industry === "Chiropractic"
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <ellipse
                    cx="50"
                    cy="25"
                    rx="8"
                    ry="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 35 L50 55 M42 40 L50 45 L58 40 M50 55 L45 75 M50 55 L55 75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M48 37 L48 53 M52 37 L52 53" strokeLinecap="round" />
                  <circle cx="48" cy="40" r="1.5" fill="currentColor" />
                  <circle cx="52" cy="40" r="1.5" fill="currentColor" />
                  <circle cx="48" cy="45" r="1.5" fill="currentColor" />
                  <circle cx="52" cy="45" r="1.5" fill="currentColor" />
                  <circle cx="48" cy="50" r="1.5" fill="currentColor" />
                  <circle cx="52" cy="50" r="1.5" fill="currentColor" />
                </svg>
                <p className="text-xl font-bold text-gray-900">Chiropractic</p>
              </button>

              <button
                onClick={() =>
                  setFormData({ ...formData, industry: "Orthodontics" })
                }
                className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  formData.industry === "Orthodontics"
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    d="M30 30 C25 30, 20 35, 20 40 C20 48, 25 55, 30 60 C35 55, 40 48, 40 40 C40 35, 35 30, 30 30 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 30 C45 30, 40 35, 40 40 C40 48, 45 55, 50 60 C55 55, 60 48, 60 40 C60 35, 55 30, 50 30 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M70 30 C65 30, 60 35, 60 40 C60 48, 65 55, 70 60 C75 55, 80 48, 80 40 C80 35, 75 30, 70 30 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="25"
                    y="38"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="45"
                    y="38"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="65"
                    y="38"
                    width="10"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <path
                    d="M20 40 L80 40"
                    strokeWidth="2"
                    strokeDasharray="2,3"
                  />
                </svg>
                <p className="text-xl font-bold text-gray-900">Orthodontics</p>
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (
                    formData.fullName &&
                    formData.practiceName &&
                    formData.practiceEmail &&
                    formData.phoneNumber &&
                    formData.industry
                  ) {
                    setStep(3);
                  }
                }}
                disabled={
                  !formData.fullName ||
                  !formData.practiceName ||
                  !formData.practiceEmail ||
                  !formData.phoneNumber ||
                  !formData.industry
                }
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-16 rounded-full text-lg transition-all shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <FinalCtaSection
          title="Ready to simplify and grow your practice?"
          description="Adit gives you all the tools you need to streamline operations, reduce costs, and keep patients engaged, all in one easy-to-use, affordable platform. Spend less time on busy work and more time delivering great patient care."
          buttonText="Book a Demo"
          buttonLink="/demo"
        />
      </div>
      )}

      {step === 3 && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h2 className="text-3xl font-bold text-center mb-10">
              Select The Services Your Practice Uses
            </h2>
            <div className="grid md:grid-cols-5 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.key}
                  className="border rounded-2xl p-6 shadow hover:shadow-lg"
                >
                  <p className="font-semibold text-center mb-4">{srv.label}</p>
                  <select
                    value={serviceSelections[srv.key] ?? ""}
                    onChange={(e) =>
                      handleServiceChange(srv.key, e.target.value)
                    }
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">Select Provider</option>
                    {srv.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  // you can persist selections into formData or process them here
                  // e.g. setFormData({...formData, serviceProviders: serviceSelections})
                  setStep(4);
                }}
                className="bg-orange-500 text-white px-10 py-4 rounded-full"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {isComplete && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 8">
        <h1 className="text-3xl font-bold text-center mb-10">Take A Look At Your Results!</h1>
        <div className="max-w-6xl mx-auto border-2 rounded-3xl p-12">
            <h2 className="text-2xl font-bold mb-4">Here’s how much Adit could help your practice generate!</h2>
            <div>
                ${valueMonthly} <span className="text-gray-500">/ monthly</span>
            </div>
            <div>
                ${valueYearly} <span className="text-gray-500">/ yearly</span>
            </div>
        </div>
        <FinalCtaSection
          title="Ready to simplify and grow your practice?"
          description="Adit gives you all the tools you need to streamline operations, reduce costs, and keep patients engaged, all in one easy-to-use, affordable platform. Spend less time on busy work and more time delivering great patient care."
          buttonText="Book a Demo"
          buttonLink="/demo"
        />
      </div>
      )}
    </SiteLayout>
  );
}
