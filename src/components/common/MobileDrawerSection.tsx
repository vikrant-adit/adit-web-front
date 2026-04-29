import React from "react";

type MobileDrawerSectionProps = {
  label: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  ariaId?: string;
};

export default function MobileDrawerSection({
  label,
  isOpen,
  toggle,
  children,
  ariaId,
}: Readonly<MobileDrawerSectionProps>) {
  return (
    <>
      <button
        className="drawer-link"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={ariaId}
        aria-label={`Toggle ${label} drawer section`}
      >
        {label} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <div className="drawer-sub" id={ariaId} aria-label={`${label} drawer submenu`}>
          {children}
        </div>
      )}
    </>
  );
}
