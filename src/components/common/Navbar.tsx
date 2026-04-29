/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import "../../styles/Navbar.css";
import { Menu, X } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import MobileDrawerSection from "./MobileDrawerSection";
import aditLogoFallback from "../../assets/logo.png";
import aiAditLogo from "../../assets/adit-ai/adit-ai-logo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GlobalPromo from "../../blocks/GlobalPromo/component.client";
import ClientOnly from "../../components/ClientOnly";
import Link from "next/link";
import { getStrapiApiUrl, getStrapiImagesUrl, getEnvVar } from "@/lib/defaults";

type DropdownMenu = string | null;

const apiUrl = getStrapiApiUrl();

const imageBase = getStrapiImagesUrl();

/* -------------------------------------------------
 * Sub-components (to reduce nesting depth)
 * ------------------------------------------------- */

const MegaItem = ({ category }: { category: any }) => (
  <Link
    href={category.href ?? "#"}
    className="mega-item"
  >
    <div className="flex items-center gap-2">
      <span className="mega-icon" />
      <span>{category.title}</span>
    </div>
  </Link>
);

const MegaColumn = ({ child }: { child: any }) => {
  if (!child.categories?.length) return null;

  return (
    <div className="mega-column">
      <Link
        href={child.href ?? "#"}
        className="mega-simple-item"
      >
        <div className="mega-title">{child.label}</div>
      </Link>
      <div className="mega-items">
        {child.categories.map((category: any) => (
          <MegaItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

const MegaSingleItem = ({ child }: { child: any }) => (
  <Link
    href={child.href ?? "#"}
    className="mega-item"
  >
    {child.label?.endsWith("CS") ? (
      <span className="flex items-center gap-2">
        {child.label.replace(" CS", "")}

        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-r-md relative">
          Coming Soon
        </span>
      </span>
    ) : (
      child.label
    )}
    {child.description && (
      <div className="mega-description text-sm text-gray-600 mt-2 whitespace-normal w-[500px]">
        {child.description}
      </div>
    )}
  </Link>
);

const MobileNavLink = ({ child, onClick }: { child: any; onClick: () => void }) => (
  <Link
    key={child.id}
    href={child.href ?? "#"}
    onClick={onClick}
  >
    {child.label}
  </Link>
);

const MobileNavSection = ({
  link,
  isOpen,
  toggle,
  onClose,
}: {
  link: any;
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}) => (
  <MobileDrawerSection
    key={link.id}
    label={link.label}
    isOpen={isOpen}
    toggle={toggle}
  >
    {link.children.map((child: any) => (
      <MobileNavLink key={child.id} child={child} onClick={onClose} />
    ))}
  </MobileDrawerSection>
);

export default function Navbar({
  headerData,
}: Readonly<{
  headerData: any;
  variant?: string;
}>) {

  const isClient = typeof globalThis !== "undefined";

  const lastScrollY = useRef<number>(isClient ? window.scrollY : 0);
  const ticking = useRef(false);
  const showRef = useRef<boolean>(true);

  const [activeDropdown, setActiveDropdown] = useState<DropdownMenu>(null);

  const [showNavbar, setShowNavbar] = useState(true);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const [promos, setPromos] = useState<any[]>([]);

  const pathname = usePathname();

  const isAiRoute = pathname?.startsWith("/call-intelligence") ?? false;

  const [drawerOpen, setDrawerOpen] = useState<Record<string, boolean>>({});

  const toggleDrawer = (label: string) => {
    setDrawerOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  /*
  =====================
  Scroll behavior
  =====================
  */

  useEffect(() => {
    showRef.current = showNavbar;
  }, [showNavbar]);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      globalThis.requestAnimationFrame(() => {
        const scY = globalThis.scrollY;

        if (scY < 50) {
          if (!showRef.current) setShowNavbar(true);
        } else if (scY > lastScrollY.current) {
          if (showRef.current) setShowNavbar(false);
        } else if (!showRef.current) setShowNavbar(true);

        lastScrollY.current = scY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  /*
  =====================
  Lock body scroll when drawer open
  =====================
  */

  useEffect(() => {
    if (!isClient) return;

    document.body.style.overflow = sideMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sideMenuOpen, isClient]);

  /*
  =====================
  Escape closes drawer
  =====================
  */

  useEffect(() => {
    if (!isClient) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSideMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [isClient]);

  /*
  =====================
  Fetch Global Promos
  =====================
  */

  useEffect(() => {
    if (!apiUrl) return;

    let mounted = true;

    const fetchPromos = async () => {
      try {
        const headers: Record<string, string> = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        const authToken = getEnvVar('STRAPI_API_AUTH_TOKEN');
        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }

        const resp = await fetch(
          `${apiUrl}/global-promos?filters[active][$eq]=true&populate=*`,
          { headers },
        );

        if (!resp.ok) return;

        const json = await resp.json();

        if (mounted) {
          setPromos(json?.data ?? []);
        }
      } catch {
        if (mounted) setPromos([]);
      }
    };

    fetchPromos();

    return () => {
      mounted = false;
    };
  }, []);

  const promo = promos?.[0];

  /*
  =====================
  Logo
  =====================
  */

  const logoUrl = headerData?.logo?.url
    ? `${imageBase}${headerData.logo.url}`
    : aditLogoFallback;

  /*
  =====================
  Render helpers
  =====================
  */

  const renderDesktopLinks = () => {
    if (!headerData?.links) return null;

    return headerData.links.map((link: any) => {
      const hasChildren = link.children && link.children.length > 0;

      // Simple link no drop down
      if (!hasChildren && link.href) {
        return (
          <Link
            key={link.id}
            href={link.href}
            target={link.newTab ? "_blank" : "_self"}
            className="cursor-pointer"
          >
            {link.label}
          </Link>
        );
      }

      // Dropdown link
      if (hasChildren) {
        // detect if any child has categories
        const hasAnyCategories = link.children.some(
          (child: any) => child.categories && child.categories.length > 0,
        );

        return (
          <MenuDropdown
            key={link.id}
            id={link.label}
            label={link.label}
            isOpen={activeDropdown === link.label}
            onOpen={(id) =>
              setActiveDropdown(activeDropdown === id ? null : id)
            }
          >
            <div
              className={
                hasAnyCategories
                  ? "mega-menu mega-menu-columns"
                  : "mega-menu mega-menu-single"
              }
            >
              {hasAnyCategories ? (
                // ✅ COLUMN LAYOUT
                link.children.map((child: any) => (
                  <MegaColumn key={child.id} child={child} />
                ))
              ) : (
                // ✅ SINGLE COLUMN LAYOUT
                <div className="mega-single-column">
                  {link.children.map((child: any) => (
                    <MegaSingleItem key={child.id} child={child} />
                  ))}
                </div>
              )}
            </div>
          </MenuDropdown>
        );
      }

      return null;
    });
  };

  const renderMobileLinks = () => {
    if (!headerData?.links) return null;

    return headerData.links.map((link: any) => {
      const hasChildren = link.children && link.children.length > 0;

      if (!hasChildren && link.href) {
        return (
          <Link
            key={link.id}
            href={link.href}
            className="drawer-link"
            onClick={() => setSideMenuOpen(false)}
          >
            {link.label}
          </Link>
        );
      }

      if (hasChildren) {
        return (
          <MobileNavSection
            key={link.id}
            link={link}
            isOpen={drawerOpen[link.label]}
            toggle={() => toggleDrawer(link.label)}
            onClose={() => setSideMenuOpen(false)}
          />
        );
      }

      return null;
    });
  };

  /*
  =====================
  JSX
  =====================
  */

  return (
    <header
      className={`navbar ${showNavbar ? "nav--main" : "navbar--hidden"} 
      ${isAiRoute ? "navbar--ai" : ""}`}
    >
      {/* Promo */}
      {promo?.active && (
        <ClientOnly>
          <GlobalPromo
            title={promo.title}
            message={promo.subtitle}
            countdownDays={promo.showOfferDuration ? promo.countdownDays : 0}
            backgroundColor={promo.backgroundColor ?? promo.backgroundImg?.url}
            promoImage={promo.promoImage?.url}
            colorSubTitle={promo.colorSubTitle}
            colorTitle={promo.colorTitle}
            ctaText={promo.ctaText}
          />
        </ClientOnly>
      )}

      <div className="flex flex-row justify-between py-2 px-4 md:px-16 lg:px-24">
        {/* Logo */}
        <h1 className="logo">
          <Link href="/">
            <Image
              src={isAiRoute ? aiAditLogo : logoUrl}
              className=" h-auto"
              width={isAiRoute ? 40 : 80}
              height={isAiRoute ? 40 : 80}
              alt="Logo"
            />
          </Link>
        </h1>

        {/* Desktop Nav */}
        <div className="nav-background">
          <nav className="nav-links">{renderDesktopLinks()}</nav>
        </div>

        {/* Right side */}
        <div className="sign-in-btn-menu">
          <Link href={headerData?.signinHref ?? "https://app.adit.com/"} className="signin-btn">
            {headerData?.signinLabel ?? "Sign In"}
          </Link>

          <div className="nav-background-right">
            <button className="menu-icon" onClick={() => setSideMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>

        {/* Overlay */}
        <button
          className={`side-overlay ${sideMenuOpen ? "open" : ""}`}
          onClick={() => setSideMenuOpen(false)}
          aria-label="Close menu"
          aria-hidden={!sideMenuOpen}
          tabIndex={sideMenuOpen ? 0 : -1}
        />

        {/* Drawer */}
        <aside className={`side-drawer ${sideMenuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setSideMenuOpen(false)}>
            <X />
          </button>

          <nav className="drawer-nav">{renderMobileLinks()}</nav>
        </aside>
      </div>
    </header>
  );
}
