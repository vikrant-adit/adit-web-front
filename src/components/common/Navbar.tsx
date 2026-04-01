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

type DropdownMenu = string | null;

const apiUrl = (process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

const imageBase = (
  process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES ?? ""
).replace(/\/$/, "");

export default function Navbar({
  headerData,
  variant,
}: {
  headerData: any;
  variant?: string;
}) {
  // console.log("Navbar received headerData:", headerData);

  const isClient = typeof window !== "undefined";

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

      window.requestAnimationFrame(() => {
        const scY = window.scrollY;

        if (scY < 50) {
          if (!showRef.current) setShowNavbar(true);
        } else if (scY > lastScrollY.current) {
          if (showRef.current) setShowNavbar(false);
        } else {
          if (!showRef.current) setShowNavbar(true);
        }

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

        if (process.env.NEXT_PUBLIC_LOCAL_AUTH_TOKEN) {
          headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_LOCAL_AUTH_TOKEN}`;
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
                link.children.map((child: any) => {
                  if (!child.categories?.length) return null;

                  return (
                    <div key={child.id} className="mega-column">
                      <Link
                        key={child.id}
                        href={child.href ?? "#"}
                        className="mega-simple-item"
                      >
                        <div className="mega-title">{child.label}</div>
                      </Link>
                      <div className="mega-items">
                        {child.categories.map((category: any) => (
                          <Link
                            key={category.id}
                            href={category.href ?? "#"}
                            className="mega-item"
                          >
                            <div className="flex items-center gap-2">
                              <span className="mega-icon" />
                              <span>{category.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // ✅ SINGLE COLUMN LAYOUT
                <div className="mega-single-column">
                  {link.children.map((child: any) => (
                    <Link
                      key={child.id}
                      href={child.href ?? "#"}
                      className="mega-item  "
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
                        <div className="mega-description text-sm text-gray-600 mt-2 whitespace-normal w-[500px] ">
                          {child.description}
                        </div>
                      )}
                    </Link>
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
          <MobileDrawerSection
            key={link.id}
            label={link.label}
            isOpen={drawerOpen[link.label]}
            toggle={() =>
              setDrawerOpen((prev) => ({
                ...prev,
                [link.label]: !prev[link.label],
              }))
            }
          >
            {link.children.map((child: any) => (
              <Link
                key={child.id}
                href={child.href ?? "#"}
                onClick={() => setSideMenuOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </MobileDrawerSection>
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
        <div
          className={`side-overlay ${sideMenuOpen ? "open" : ""}`}
          onClick={() => setSideMenuOpen(false)}
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
