import { JSX, useState } from "react";
import "../../styles/Features.css";
import Image from "next/image";
import { buildImageUrl } from "@/lib/defaults";

interface Feature {
  title: string;
  desc: string;
}

export default function Features(): JSX.Element {
  const features: Feature[] = [
    {
      title: "Centralize Communication",
      desc: "Bring all your patient communication, calls, texts, forms, and reminders, into one place so nothing slips through the cracks and your front desk runs with zero headaches.",
    },
    {
      title: "Streamline Operations",
      desc: "Simplify everyday tasks like scheduling and billing with tools that work together, so your team can save precious hours.",
    },
    {
      title: "Boost Production",
      desc: "Fill more chairs, reduce no-shows, and convert inquiries into appointments with smart automation designed to grow your practice without the extra effort.",
    },
    {
      title: "Adit AI",
      desc: "Adit AI brings intelligence to your practice. From call handling to re-care and insurance verification, it automates the busy work so your team can deliver care, not chase paperwork.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="features">
      <h2>A complete suite to power your practice</h2>
      <p>
        Whether you’re growing or just looking for something better, Adit’s
        all-in-one platform helps your practice work smarter. From scheduling
        and communication to payments and analytics, our tools reduce chaos and
        keep your team focused on care.
      </p>

      <div className="feature-container">
        <div className="feature-tabs">
          {features.map((f: Feature, i: number) => (
            <button
              key={i}
              className={`feature-tab ${activeIndex === i ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              {f.title}
            </button>
          ))}
        </div>

        <div className="feature-detail">
             <div className="feature-description">
                <h2 className="feature-title">{features[activeIndex].title}</h2>
        <p>{features[activeIndex].desc}</p>
        <button className="btn-primary read-more-btn">Read More</button>
      </div>
          <Image src={buildImageUrl("centralize_communication_heroimg_152e9d1abd.png")} alt="Adit Features" loading="lazy" width={500} height={400} />
        </div>
      </div>

     
    </section>
  );
}
