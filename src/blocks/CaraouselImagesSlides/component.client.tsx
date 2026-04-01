// components/AllStepsSection.tsx
'use client';
import React from 'react';
import { FeatureStepRow } from '@/app/optometry/components/FeatureStepRow';
import { resolveImageUrl } from '@/lib/imageResolver';

export interface StepCard {
  image: string;
  alt: string;
  caption: string;
  description?: string;
}

export interface AllStepsSectionStep {
  step: number;
  tag: string;
  title: string;
  cards: StepCard[];
  showArrows?: boolean;
}

export interface AllStepsSectionProps {
  steps?: AllStepsSectionStep[];
    isGlobal?: boolean;
  globalKey?: string;
}

const defaultSteps: AllStepsSectionStep[] = [
  {
    step: 1,
    tag: "Adit Voice & Patient Recall",
    title: "Intelligent Phone System Drives Better Conversations with Patients",
    cards: [
      {
        image: "http://localhost:1337/uploads/adit_voice_and_patient_card_a680e22694.gif",
        alt: "Caller ID dashboard",
        caption: "On inbound ring, Adit immediately shows which patient is calling.",
      },
      {
        image: "http://localhost:1337/uploads/immediately_see_all_of_the_critical_action_items_to_discuss_with_that_patient_d8671093c5.png",
        alt: "Call controls",
        caption: "Internal or 3‑way calls created in seconds to discuss while patient waits.",
      },
      {
        image: "http://localhost:1337/uploads/see_all_patients_and_add_any_notes_necessary_so_that_everyone_is_on_the_same_page_8b51332348.png",
        alt: "Notes on screen",
        caption: "See all previous and Adit Anywhere notes so the team is on the same page.",
      },
    ],
  },
  {
    step: 2,
    tag: "Digital Forms",
    title: "Integrated Digital Forms Save Your Staff Time",
    cards: [
      {
        image: "http://localhost:1337/uploads/allow_patients_to_check_in_complete_forms_on_adits_ipad_kiosk_8e6fcc20bd.png",
        alt: "Tablet forms",
        caption: "Allow patients to check in and complete forms on Adit's iPad kiosk.",
      },
      {
        image: "http://localhost:1337/uploads/digital_form_gif_60866542c9.gif",
        alt: "Mobile form",
        caption: "Connect patient forms with your practice management system in a click.",
      },
    ],
  },
  {
    step: 3,
    tag: "ASAP Lists",
    title: "Eliminate Gaps in Your Schedule with Adit's Waitlist Feature",
    cards: [
      {
        image: "http://localhost:1337/uploads/asap_list1_gif_47d8d395ce.gif",
        alt: "ASAP patient tile",
        caption: "Add patients who want earlier appointments into your ASAP list.",
      },
      {
        image: "http://localhost:1337/uploads/asap_list2_gif_7e4a651f15.gif",
        alt: "ASAP list",
        caption: "In the event of cancellation, select this ASAP list and text them.",
      },
    ],
  },
];


const AllStepsSection: React.FC<AllStepsSectionProps> = ({ steps = defaultSteps }) => {
  return (
    <div className="w-full">
      {steps.map((step) => (
        <FeatureStepRow
          key={step.step}
          step={step.step}
          tag={step.tag}
          title={step.title}
          cards={step.cards.map(card => ({
            ...card,
            image: resolveImageUrl(card.image),
          }))}
          showArrows={step.showArrows}
        />
      ))}
    </div>
  );
};

export default AllStepsSection;