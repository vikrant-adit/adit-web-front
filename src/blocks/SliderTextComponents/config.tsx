// File: config.tsx
'use client';
import React from 'react';
import type { ComponentConfig } from '@wecre8websites/strapi-page-builder-react';
import AditSlider,{AditSliderProps} from './component.client';

export type SlideItem = {
  id?: string | number;
  author?: string;
  org?: string;
  content?: string;
  rating?: number;
};



const AditSliderConfig: Omit<ComponentConfig<AditSliderProps, AditSliderProps>, 'type'> = {
  label: 'Adit Testimonial Slider',
  fields: {
    slides: {
      type: 'object',
      label: 'Slides',
    //   objectFields: {  },
      objectFields: {
        author: { type: 'text', label: 'Author' },
        org: { type: 'text', label: 'Organization' },
        content: { type: 'textarea', label: 'Content' },
        rating: { type: 'number', label: 'Rating (1-5)' },
      },
    },
    // autoplay: { type: 'text', label: 'Autoplay' },
    // autoplayInterval: { type: 'number', label: 'Autoplay interval (ms)'},
    showDots: { type: 'text', label: 'Show Dots' },
    className: { type: 'text', label: 'Custom classes' },
  },
  defaultProps: {
    slides: [
      {
        id: 1,
        author: 'Adam I.',
        org: 'Shasta Dental Services',
        content:
          " By combining multiple operational components of a dental office, I can go to ADIT for most of the practices basic needs. I don't have to go through several companies to run a dental office. I can login into my ADIT app and access all the data I need to continue to drive growth and performance with staff. I also like that we go to ONE single software for multiple uses.",
        rating: 5,
      },
      {
        id: 2,
        author: 'Glenn A.',
        org: 'OASIS Modern Dentistry and Orthodontics',
        content:
          'I love that I have a dedicated account manager and team that is super responsive and collaborative. The offerings are always expanding with new features and capabilities… and without any add on costs! I think Adit must have plans to take over the market space for all things dental. It’s such a great way to simplify what could be contracts and systems from a large number of vendors.',
        rating: 5,
      },
      {
        id: 3,
        author: 'Jenn C.',
        org: 'Practice Strategies',
        content:
          'Adit is EXTREMELY helpful with new patient acquisition. The ability to sort data and see, in real-time, what is happening at our practices is invaluable. Their reporting and support is really great too. The software allowed me to get rid of a lot of stand-alone products that I was having to log into and maintain (and pay for!)',
        rating: 5,
      },
      {
        id:4,
        author: 'Abby',
        org: 'Carrollwood Dental Studio',
        content:
          `We love the confirmation texts, emails and new patient paperwork that's sent out to the patients. Also the website is user friendly.`,
        rating: 5,
      },
       {
        id:5,
        author: 'Allan F.',
        org: 'Carrollwood Dental Studio',
        content:
          `We love the patient forms that can be emailed to the patient and filled out without the need for them to be printed out. Also love the automatic appointment reminders and the option to book new appointments online.`,
        rating: 5,
      },
      {
        id:6,
        author: 'Nakul R.',
        org: 'EZ Dental',
        content:
          `Very Useful software and simple to use by our team. Recommend it to every dental practice to increase efficiency. Integration with my patient management software makes the Website and Scheduling integration very effective.`,
        rating: 5,
      },
      {
        id:7,
        author: 'Allen S.',
        org: 'Jackson Square Dental',
        content:
          `We use the platform for many aspects and really enjoy the communication between the office and patient. The reports and audio recordings help us coach and train to ensure we are providing the best patient experience. Overall we love that we went with Adit. The software is very user friendly and helps us monitor and grow our business. 5 Stars!`,
        rating: 5,
      },
      // add additional defaults if needed
    ],
    autoplay: true,
    autoplayInterval: 7000,
    showDots: true,
    className: '',
  },
  render: (data) => <AditSlider {...data} />,
};

export default AditSliderConfig;


