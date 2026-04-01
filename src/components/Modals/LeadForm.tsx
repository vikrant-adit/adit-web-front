'use client';
import React from "react";

export default function LeadForm({ onClose, campaign }: { onClose?: () => void; campaign?: string }) {
  return (
    <div>
      <h2>Lead Form</h2>
      <p>Campaign: {campaign}</p>

      <form>
        <input placeholder="Your name" className="border p-2 w-full my-2" />
        <input placeholder="Your email" className="border p-2 w-full my-2" />
        <button className="btn-primary mt-4">Submit</button>
      </form>

      <button className="mt-4 underline" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
