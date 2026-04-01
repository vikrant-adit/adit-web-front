import React from "react";

type MenuDropdownProps = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string | null) => void; // accept string|null
  label: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function MenuDropdown({
  id,
  isOpen,
  onOpen,
  label,
  children,
  className = "",
  ariaLabel,
}: MenuDropdownProps) {
  return (
    <div
      className={`dropdown ${className}`}
      onMouseEnter={() => onOpen(id)}
      onMouseLeave={() => onOpen(null)}
    >
      <a  aria-label={ariaLabel || `Open ${label} menu`}>
        {label} <span className={`arrow ${isOpen ? "open" : ""}`} aria-hidden>
          ▾
        </span>
      </a>

      <div className={`dropdown-menu ${isOpen ? "show" : ""}`} aria-label={`${label} submenu`}>
        {children}
      </div>
    </div>
  );
}
