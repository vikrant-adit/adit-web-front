'use client';
import React, { useState } from 'react';

const PopupForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Sign Up Form
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-xl rounded shadow-xl p-4 relative">
            
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-2 text-gray-600 text-xl"
            >
              ×
            </button>

            {/* Load your page */}
            <iframe
              src="/sign-up-forms"
              className="w-full h-[70vh] border-0 rounded"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
