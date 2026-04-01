import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ResultsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const results = [
    {
      logo: "AVA Dental",
      amount: "$66K",
      description: "AVA Dental added $66K in production in just 3 months by boosting patient bookings 25% using",
      feature: "Digital Forms"
    },
    {
      logo: "Dentists at Lincoln Green", 
      amount: "80%",
      description: "Dentists at Lincoln Green cut no-shows by 80% through smart",
      feature: "Patient Recall"
    },
    {
      logo: "Arnold Dentistry",
      amount: "75%", 
      description: "Arnold Dentistry reduced administrative workload by 75% using",
      feature: "Adit VoiP and Call Tracking"
    },
    {
      logo: "OrthoGrace Dental",
      amount: "91%",
      description: "OrthoGrace Dental increased treatment acceptance by 91% with easy payments plans via",
      feature: "Adit Pay"
    },
    {
      logo: "Dedicated Dentistry",
      amount: "$1.6M",
      description: "Dedicated Dentistry grew to $1.6M in revenue by making data-driven decisions with",
      feature: "Practice Analytics"
    },
    {
      logo: "Sandi E. Silva DDS",
      amount: "30%",
      description: "Sandi E. Silva DDS, Inc. achieved a 30% revenue increase and saved 16 hours/week by automating",
      feature: "Insurance Verification"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % results.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [results.length]);

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-12">
          Practices switch to Adit because we deliver results!
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center min-h-[200px] flex flex-col justify-center">
            <div className="mb-4">
              <div className="text-lg font-semibold text-navy mb-2">
                {results[currentIndex].logo}
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl md:text-5xl font-bold text-orange mr-2">
                {results[currentIndex].amount}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              {results[currentIndex].description}
            </p>
            
            <Button variant="link" className="text-orange font-semibold">
              {results[currentIndex].feature}
            </Button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;