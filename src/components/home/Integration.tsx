import Image from "next/image";
import { JSX, useState, useEffect, useRef } from "react";

const integrations: Record<string, { logo: string; name: string }[]> = {
  Dental: [
    {
      name: "Dentrix",
      logo: "https://enfolytics.com/adit/home-v2/images/dentrix-logo-pms.svg",
    },
    {
      name: "Dentrix Ascend",
      logo: "https://enfolytics.com/adit/home-v2/images/dentrix-ascend-logo-pms.svg",
    },
    {
      name: "Open Dental",
      logo: "https://enfolytics.com/adit/home-v2/images/open-denatal-logo-pms.svg",
    },
    {
      name: "Curve Dental",
      logo: "https://enfolytics.com/adit/home-v2/images/curve-dental-logo-pms.svg",
    },
    {
      name: "Denticon",
      logo: "https://enfolytics.com/adit/home-v2/images/denticon-logo-pms.svg",
    },
    {
      name: "ABELDent",
      logo: "https://enfolytics.com/adit/home-v2/images/abeldent-logo-pms.svg",
    },
    {
      name: "Carestream",
      logo: "https://enfolytics.com/adit/home-v2/images/carestream-logo-pms.svg",
    },
    {
      name: "Tracker",
      logo: "https://enfolytics.com/adit/home-v2/images/tracker-logo-pms.svg",
    },
    {
      name: "Eaglesoft",
      logo: "https://enfolytics.com/adit/home-v2/images/eaglesoft-logo-pms.svg",
    },
    {
      name: "EasyDental",
      logo: "https://enfolytics.com/adit/home-v2/images/easydental-logo-pms.svg",
    },
    {
      name: "ClearDent",
      logo: "https://enfolytics.com/adit/home-v2/images/cleardent-logo-pms.svg",
    },
  ],
  Optometry: [
    {
      name: "Crystal PMS",
      logo: "https://enfolytics.com/adit/home-v2/images/crystal-logo-pms.svg",
    },
    {
      name: "eyeinfinity",
      logo: "https://enfolytics.com/adit/home-v2/images/eyefinity-logo-pms.svg",
    },
    {
      name: "RevolutionEHR",
      logo: "https://enfolytics.com/adit/home-v2/images/revolution-ehr-logo-pms.svg",
    },
    {
      name: "eyeinfinity officemate",
      logo: "https://enfolytics.com/adit/home-v2/images/eyefinity-officemate-logo-pms.svg",
    },
  ],
  Chiropractic: [
    {
      name: "chirotouch",
      logo: "https://enfolytics.com/adit/home-v2/images/chirotouch-logo-pms.svg",
    },
  ],
  Orthodontics: [
    {
      name: "Cloud 9 Software",
      logo: "https://enfolytics.com/adit/home-v2/images/cloud9-software-logo.svg",
    },
    {
      name: "Dolphin",
      logo: "https://enfolytics.com/adit/home-v2/images/dolphin-logo.svg",
    },
    {
      name: "OrthoTrac",
      logo: "https://enfolytics.com/adit/home-v2/images/orthotrac-logo.svg",
    },
  ],
};
export default function Integration(): JSX.Element {
  const [activeTab, setActiveTab] = useState("Dental");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-tr from-[#E8F7FE] to-white text-center"
    >
      {/* Title */}
      <h2 className="text-[28px] md:text-[42px] lg:text-[50px] font-medium text-[#002D42] mb-5">
        Seamless integrations for your practice
      </h2>
      <p className="max-w-[90%] md:max-w-[70%] mx-auto text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
        Our platform integrates effortlessly with the most widely used practice
        management systems (PMS), ensuring a smooth, efficient workflow without
        the headaches of complex setups or disconnected tools.
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex justify-center border-b border-sky-400 w-[95%] md:w-[80%] lg:w-[60%] overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {Object.keys(integrations).map((tab) => (
            <button
              key={tab}
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 md:px-10 py-3 text-base md:text-lg font-medium whitespace-nowrap relative snap-center transition-colors ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500 font-semibold"
                  : "text-[#002D42] hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Logos Grid */}
      <div
        className={`flex flex-wrap justify-center gap-4 md:gap-6 max-w-[1000px] mx-auto transition-all ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {integrations[activeTab].map((item, i) => (
          <div
            key={i}
            className="min-w-[100px] md:min-w-[140px] h-[40px] md:h-[60px] flex items-center justify-center px-3 md:px-4 bg-white/90 rounded-lg border border-sky-200 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <Image
              src={item.logo}
              alt={item.name|| 'Image'}
              width={100}
              height={100}
              className="max-h-[30px] md:max-h-[40px] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
