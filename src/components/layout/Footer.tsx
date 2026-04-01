"use client";
import { Mail, Clock, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/imageResolver";

export default function Footer({ footer }: any) {
  if (!footer) return null;

  const productColumn = footer.columns?.find(
    (col: any) => col.title === "Product",
  );

  const otherColumns = footer.columns?.filter(
    (col: any) => col.title !== "Product",
  );

  return (
    <footer className="bg-[#eef3f7] text-[#0f172a]">
      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        {/* LEFT BRAND SECTION */}
        <div>
          {/* Logo */}
          {footer.logo?.url && (
            <Image
              src={resolveImageUrl(footer.logo.url)}
              alt="Logo"
              className="h-auto"
              width={140}
              height={40}
              unoptimized
            />
          )}

          {/* Tagline */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {footer.tagline}
          </p>

          {/* CONTACT BOX */}
          <div className="mt-6 border border-[#25A8E0]/30 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-center divide-x">
              <div className="py-4 px-2 flex flex-col items-center">
                <Mail className="text-orange-500 mb-2" size={18} />
                <div className="text-xs text-gray-500">Email:</div>
                <div className="text-sm font-medium">info@adit.com</div>
              </div>

              <div className="py-4 px-2 flex flex-col items-center">
                <Clock className="text-orange-500 mb-2" size={18} />
                <div className="text-xs text-gray-500">Support Hours:</div>
                <div className="text-sm font-medium">7 AM CST to 7 PM CST</div>
              </div>

              <div className="py-4 px-2 flex flex-col items-center">
                <Phone className="text-orange-500 mb-2" size={18} />
                <div className="text-xs text-gray-500">Call:</div>
                <div className="text-sm font-medium">(832) 225-8865</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT LINKS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-10">
            {footer.columns
              ?.filter((col: any) => col.title === "Adit")
              .map((column: any) => (
                <div key={column.id}>
                  <h3 className="font-semibold mb-4">{column.title}</h3>

                  <div className="flex flex-col gap-2">
                    {column.links?.map((link: any) => (
                      <Link
                        key={link.id}
                        href={link.href || "#"}
                        className="text-gray-600 hover:text-orange-500 text-sm"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-10">
            {footer.columns
              ?.filter(
                (col: any) =>
                  col.title === "Adit AI" ||
                  col.title === "Industry" ||
                  col.title === null,
              )
              .map((column: any) => (
                <div key={column.id}>
                  <h3 className="font-semibold mb-4">{column.title}</h3>

                  <div className="flex flex-col gap-2">
                    {column.links?.map((link: any) => (
                      <Link
                        key={link.id}
                        href={link.href || "#"}
                        className="text-gray-600 hover:text-orange-500 text-sm"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* COLUMN 3 — PRODUCT */}
          {footer.columns
            ?.filter((col: any) => col.title === "Product")
            .map((productColumn: any) => (
              <div key={productColumn.id}>
                <h3 className="font-semibold mb-4">{productColumn.title}</h3>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {productColumn.links?.map((group: any) => (
                    <div key={group.id}>
                      <Link
                        href={group.href || "#"}
                        className="font-semibold text-sm hover:text-orange-500 block mb-2"
                      >
                        {group.label}
                      </Link>

                      <div className="flex flex-col gap-1">
                        {group.children?.map((child: any) => (
                          <Link
                            key={child.id}
                            href={child.href || "#"}
                            className="text-gray-600 hover:text-orange-500 text-sm"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      {/* BOTTOM BAR */}
      <div className="border-t border-gray-300 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* COPYRIGHT */}
          <div className="text-sm text-gray-500">
            © 2026 Adit. All Rights Reserved.
          </div>

          {/* LEGAL LINKS */}
          <div className="flex gap-4 text-sm text-gray-600">
            <Link href="/terms-of-use" className="hover:text-orange-500">
              Terms of Use
            </Link>

            <span className="text-gray-400">|</span>

            <Link href="/privacy-policy" className="hover:text-orange-500">
              Privacy Policy
            </Link>

            <span className="text-gray-400">|</span>

            <Link href="/return-policy" className="hover:text-orange-500">
              Return Policy
            </Link>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {/* Facebook */}
            <Link href="https://facebook.com">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                f
              </div>
            </Link>

            {/* X */}
            <Link href="https://x.com">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                X
              </div>
            </Link>

            {/* Instagram */}
            <Link href="https://instagram.com">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ig
              </div>
            </Link>

            {/* LinkedIn */}
            <Link href="https://linkedin.com">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                in
              </div>
            </Link>

            {/* YouTube */}
            <Link href="https://youtube.com">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ▶
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
