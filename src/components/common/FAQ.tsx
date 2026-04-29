'use client'; // This directive is necessary because the component uses React hooks (useState)

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How long does it take to get fully set up?",
    answer:
      "Getting you up and running on the Adit platform only takes 6 hours of your time, so our team handles most of the back-end configuration for you over a typical period of 2 weeks. We work at your pace to ensure a smooth transition without disrupting your busy practice. Our average customer usually implements Adit within 21 days.",
  },
  {
    question: "Does this affect other software on my computer?",
    answer:
      "No. The Adit application does not disrupt any of your existing software or services.",
  },
  {
    question: "Do I need to turn off all my existing patient communication systems?",
    answer:
      "No. We will help guide you through the migration process. Once you feel comfortable with the Adit platform, we will help you make a smooth transition to our system.",
  },
  {
    question: "Do you have contracts?",
    answer:
      "Our tech packages do not have any binding contracts so you can cancel your subscription any time. However, our marketing agreements are locked into a 1 year contract with a Patient Booking Guarantee. Click Here to learn more about our Patient Booking Guarantee.",
  },
  {
    question: "Do I need to pay for emails and texts?",
    answer:
      "All plans include a significant amount of emails and texts per month that will be sufficient for most practices. However, for larger practices that mass-communicate with their patients, additional fees may apply. Additional usage fees are outlined above.",
  },
  {
    question: "Can I use my existing tablets for Patient Forms?",
    answer:
      "Absolutely! We support iPads, Android tablets, Kindle Fires, as well as other tablets equipped with an Internet browser.",
  },
];

// In the App Router, a 'page.tsx' file must be a default export.
// It will automatically become the /faq route.
const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={item.answer}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-lg hover:bg-gray-50 transition"
            >
              <span>{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 border-t text-gray-700 bg-gray-50">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;