'use client';
import Image from "next/image";
import Link  from "next/link"

type CaseStudyCardProps = {
  image: string;
  category: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  link: string;
};

const CaseStudyCard = ({
  image,
category,
  title,
  description,
  stats,
  link,
}: CaseStudyCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-md">
      {/* Image */}
      <div className="relative">
        <Image src={image} alt={title|| 'Image'} width={100} height={100} className="w-full h-48 object-cover" loading="lazy" />
        <span className="absolute top-4 left-4 bg-white text-blue-900 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          <i className="fas fa-tooth"></i> {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-blue-50 rounded-xl p-3"
            >
              <span className="text-blue-900 font-bold text-xl">
                {stat.value}
              </span>
              <p className="text-gray-600 text-xs text-center">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
       <Link
  href={`/case-studies/${link}`} // ✅ Navigate to detail page
  className="block text-center bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition-all"
>
  Read More
</Link>
      </div>
    </div>
  );
};

export default CaseStudyCard;
