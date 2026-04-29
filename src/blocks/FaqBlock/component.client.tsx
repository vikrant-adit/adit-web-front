'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEditorGlow } from '@/hooks/useEditorGlow';

interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlockProps {
  title?: string;
  items?: FaqItem[];
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  titleSize?: string;
  spacing?: string;
  isGlobal?: boolean;
  globalKey?: string;
}

const FaqBlock: React.FC<FaqBlockProps> = ({
  title = "Frequently Asked Questions",
  items = [],
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  borderColor = "border-gray-200",
  titleSize = "text-3xl",
  spacing = "space-y-4",
  isGlobal,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { shouldGlow } = useEditorGlow(isGlobal);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 ${backgroundColor} ${shouldGlow ? 'ring-2 ring-blue-400' : ''}`}>
      <h2 className={`${titleSize} font-bold mb-6 ${textColor}`}>
        {title}
      </h2>

      <div className={spacing}>
        {items?.map((item, index) => (
          <div
            key={item.question + index}
            className={`border rounded-lg shadow-sm overflow-hidden ${borderColor}`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full flex justify-between items-center p-4 text-left font-medium text-lg ${textColor} hover:bg-gray-50 transition`}
            >
              <span>{item.question}</span>

              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {openIndex === index && (
              <div className={`p-4 border-t ${borderColor} ${textColor} bg-gray-50`}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqBlock;
