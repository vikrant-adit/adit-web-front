'use client';
import { JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ✅ Import required Font Awesome icons
import {
  faPhoneSquareAlt,
  faFax,
  faEnvelope,
  faFileLines,
  faBell,
  faPhoneVolume,
  faCommentsDollar,
  faDesktop,
  faMailBulk,
  faBullhorn,
  faCheckToSlot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import {
  faComments,
  faCommentAlt,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";

import {
  faSearchengin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

export const DataForProduct: Record<
  string,
  {
    heading: string;
    items: { icon: JSX.Element; title: string; description: string; route?: string }[];

  }
> = {
  CentralComms: {
    heading: "Simplify how your practice connects, communicates, and grows",
    items: [
      {
        icon: (
          <FontAwesomeIcon
            icon={faPhoneSquareAlt}
            className="rotate-90 text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Adit Voice",
        description:
          "Ensure every patient call is answered, tracked, and handled with care with Adit’s VoIP phones.",
        route: "/dental-voip-phone-system",
      },
     
      {
        icon: (
          <FontAwesomeIcon
            icon={faComments}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Texting",
        description:
          "Make communication simple and convenient with two-way HIPAA-compliant texting.",
        route: "/hipaa-compliant-texting-dentists",

      },
      
      {
        icon: (
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Email",
        description:
          "Keep patients engaged through timely, automated email marketing.",
        route: "/email-marketing-dentists",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCommentAlt}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Internal Chat",
        description:
          "Strengthen teamwork and cohesion with Adit’s internal communication software.",
         route: "/instant-dental-office-messaging",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faFax}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "eFax ",
        description:
          "Eliminate paperwork and go digital with the best HIPAA-compliant fax service.",
                  route: "/efax",

      },
       {
        icon: (
          <FontAwesomeIcon
            icon={faPhoneSquareAlt}
            className="rotate-90 text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Mobile App",
        description:
          "Manage schedule, messages, and tasks on the go. Stay connected from anywhere with Adit’s mobile practice management application.",
        route: "/dental-practice-management-mobile-app",

      },
    ],
  },

  StreamlineOperation: {
    heading: "Simplify how your practice works, fills and flows",
    items: [
      {
        icon: (
          <FontAwesomeIcon
            icon={faFileLines}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Digital Forms",
        description:
          "Replace paperwork with online patient forms that sync with your PMS, autofill patient data, and reduce front desk workload.",
         route: "/online-dental-patient-forms",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Online Scheduling",
        description:
          "Give patients 24/7 booking with real-time availability. Cut back on calls and reduce cancellations with Adit's online scheduling.",
           route: "/dental-appointment-scheduling-software",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faComments}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Appointment Reminders",
        description:
          "Reduce no-shows and missed appointments with automated text and email reminders that sync to your calendar.",
        route: "/dental-appointment-reminder-software",
      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCommentAlt}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Insurance Verifications",
        description:
          "Verify patient eligibility and insurance coverage instantly. Prevent delays and unexpected surprises with real-time eligibility checks.",
          route: "/insurance-verification",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faStar}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Pozative Reviews",
        description:
          "Boost your online reputation, attract more patients, and manage reviews effortlessly with Adit’s reputation management software.",
          route: "/dental-reputation-management-software",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCheckToSlot}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Tasks",
        description:
          "Stay on track with built-in task management that automates follow-ups, assigns action items, and keeps your practice teams aligned.",
                  route: "/tasks",

      },
    ],
  },

  BoostProduction: {
    heading:
      "Stronger retention. Higher collections. Better treatment acceptance.",
    items: [
      {
        icon: (
          <FontAwesomeIcon
            icon={faFileLines}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Practice Analytics",
        description:
          "Track performance, monitor KPIs, and uncover revenue opportunities with real-time practice analytics dashboards built for your practice.",
         route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Treatment Plans",
        description:
          "Build customizable, digital treatment plans that increase acceptance and integrate seamlessly with payments for faster case approvals.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faBell}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "CareCredit",
        description:
          "Offer flexible financing options and get paid faster with CareCredit, built directly into Adit for seamless patient payments.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faPhoneVolume}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Patient Recall",
        description:
          "Automate your recall system with text and email reminders that bring patients back for care, without extra work.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faCommentsDollar}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Adit Pay",
        description:
          "Simplify payments with text-to-pay, automated reminders, and in-office terminals, using Adit’s integrated billing software and PMS connectivity.",
                  route: "/dental-voip-phone-system",

      },
    ],
  },

  AcquireMorePatient: {
    heading: "Stronger presence. More patients. Higher growth",
    items: [
      {
        icon: (
          <FontAwesomeIcon
            icon={faDesktop}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Website Design",
        description:
          "High-performing dental websites designed to attract more patients and grow your practice.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faSearchengin}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "SEO",
        description:
          "Smart dental SEO to rank higher, attract more patients, and outshine competitors.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faMailBulk}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Email Marketing",
        description:
          "Smart dental email marketing to engage patients, reduce no-shows, and grow your practice.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faGoogle}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Google Ads",
        description:
          "High-impact Google Ads for dentists to boost patient growth and maximize ROI.",
                  route: "/dental-voip-phone-system",

      },
      {
        icon: (
          <FontAwesomeIcon
            icon={faBullhorn}
            className="text-5xl text-sky-500 group-hover:text-white transition-colors duration-300"
          />
        ),
        title: "Meta Ads",
        description:
          "Convert clicks into patients with powerful dental Facebook Ads that drive real bookings.",
                  route: "/dental-voip-phone-system",

      },
    ],
  },
};
