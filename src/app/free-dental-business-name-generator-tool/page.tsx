'use client';
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import dentalExampleImage from "../../assets/450-plus-examples-of-dental-office-business-names.png";
import NewDentalBusiness from "../../assets/so-you-are-opening-a-new-dental-business.png";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";

export default function NameGenerator() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [practiceType, setPracticeType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const practiceTypes = [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Orthodontics",
    "Pediatric Dentistry",
    "Periodontics",
    "Endodontics",
    "Oral Surgery",
  ];

  const generateBusinessNames = (): string[] => {
    const names: string[] = [];
    const keyword = keywords.trim().toLowerCase().replace(/\s+/g, "");
    const loc = location.trim().toLowerCase().replace(/\s+/g, "");
    const type = practiceType.split(" ")[0].toLowerCase();

    // Various naming patterns
    const patterns = [
      `${keyword}dental`,
      `${keyword}care`,
      `${keyword}smiles`,
      loc ? `${loc}dental` : null,
      loc ? `${loc}dentalcare` : null,
      loc ? `${loc}smiles` : null,
      keyword ? `${keyword}${type}` : null,
      `dentalcare${keyword}`,
      `smilespro${keyword}`,
      `${type}care${keyword}`,
      loc && keyword ? `${loc}${keyword}dental` : null,
      loc && keyword ? `${keyword}${loc}care` : null,
      `${keyword}dentistry`,
      `${keyword}orthodontics`,
      `dr${keyword}dental`,
      loc ? `dr${loc}dental` : null,
      `${keyword}dentalstudio`,
      loc ? `${loc}dentalgroup` : null,
      `advance${keyword}dental`,
      `premium${keyword}dental`,
    ];

    // Filter out null values and create unique names
    patterns.forEach((pattern) => {
      if (pattern && pattern.length > 2 && pattern.length < 30) {
        names.push(pattern);
      }
    });

    // Remove duplicates
    const uniqueNames = [...new Set(names)];
    
    return uniqueNames.slice(0, 15); // Return top 15 results
  };

  const handleSearch = () => {
    if (!keywords.trim() && !location.trim()) {
      alert("Please enter at least keywords or location");
      return;
    }
    
    const generatedNames = generateBusinessNames();
    setResults(generatedNames);
    setHasSearched(true);
  };

  const handleDomainClick = (domainName: string) => {
    const cleanDomain = domainName.replace(/\s+/g, "");
    const godaddyUrl = `https://www.godaddy.com/en-in/domainsearch/find?checkAvail=1&domainToCheck=${cleanDomain}`;
    window.open(godaddyUrl, "_blank");
  };

  return (
 <SiteLayout>
    <div className="min-h-screen">
      {/* Top Section with Gradient Background */}
      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 py-16 px-4">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Easy Dental Business Name Generator Tool
            </h1>
            <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto">
              Naming your new dental company is hard. Our dental business name
              generator tool makes it easy for you to find your perfect name.
              Enter the details below and our dental business name generator
              tool will give you a list of dental company names and their domain
              name availability.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <div className="grid grid-cols-1 md:griad-cols-4 gap-4">
              {/* Keywords Input */}
              <div className="md:col-span-1">
                <input
                  type="text"
                  placeholder="1-2 words you want your business name to include"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Location Input */}
              <div className="md:col-span-1">
                <input
                  type="text"
                  placeholder="City/Street Name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Practice Type Dropdown */}
              <div className="md:col-span-1 relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-left text-gray-700 flex items-center justify-between bg-white"
                >
                  <span
                    className={practiceType ? "text-gray-700" : "text-gray-500"}
                  >
                    {practiceType || "Practice Type"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {practiceTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setPracticeType(type);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-cyan-50 cursor-pointer text-gray-700 transition-colors"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="md:col-span-1">
                <button
                  onClick={handleSearch}
                  className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-md"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && results.length > 0 && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
              Suggested Dental Business Names
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((name, index) => (
                <button
                  key={index}
                  onClick={() => handleDomainClick(name)}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl border-2 border-transparent hover:border-cyan-500 transition-all group cursor-pointer text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">
                        {name}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">.com</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Click to check availability on GoDaddy</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasSearched && results.length === 0 && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
          <div className="w-full max-w-6xl mx-auto text-center">
            <p className="text-xl text-slate-600">No results generated. Please try different keywords or location.</p>
          </div>
        </div>
      )}

      {/* Bottom Section with White Background */}
      <div className="bg-white py-16 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
            More Resources For Starting A New Dental Business
          </h2>

          <div className=" overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left Column - Image */}
              <div className="bg-slate-50 flex items-center justify-center p-8">
                <Image
                  src={dentalExampleImage}
                  alt="450+ Examples of Dental Office Business Names"
                   width={1000}
                  height={1000}
                  className="w-full h-auto max-w-md"
                />
              </div>

              {/* Right Column - Content */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                  450+ Examples Of Dental Office Business Names
                </h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Useful tips and ideas for naming your new dental business plus
                  helpful steps you can take to get the creativity flowing!
                </p>
                <div>
                  <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full transition-colors shadow-lg">
                    Read Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section with White Background */}
      <div className="bg-white py-16 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className=" overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left Column - Image */}

              <div className="flex flex-col justify-center p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                  So You’re Opening A New Dental Business?
                </h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  How exciting! While you’re on the hunt for which optical
                  scanners, intraoral cameras, and dental lasers your practice
                  will use, have you considered which software systems your
                  dental office and front desk needs to run smoothly? Check out
                  our FREE guide: Dental Office Startup Tech Checklist: 7 Core
                  Systems To Explore Before Opening Your Door.
                  <p>What’s Inside:</p>
                  <ul className="list-disc">
                    <li>Creating a Dynamic Phone System</li>
                    <li>Expanding Patient Engagement</li>
                    <li>Establishing Flexible Payment Protocols</li>
                    <li>Leveraging Dental Practice Analytics Early</li>
                  </ul>
                </p>
                <div>
                  <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full transition-colors shadow-lg">
                    Read Article
                  </button>
                </div>
              </div>
              {/* Right Column - Content */}
              <div className="bg-slate-50 flex items-center justify-center p-8">
                <Image
                  src={NewDentalBusiness}
                  alt="450+ Examples of Dental Office Business Names"
                  width={1000}
                  height={1000}
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </SiteLayout>
  );
}
