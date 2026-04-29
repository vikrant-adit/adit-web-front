// /app/contact-us/api/route.ts
import { NextResponse } from "next/server";
import { getStrapiApiUrl, getStrapiAuthToken } from "@/lib/defaults";

export const revalidate = 3600; // ✅ cache for 1 hour

export async function GET() {
  try {
    const apiUrl = getStrapiApiUrl();
    const res = await fetch(`${apiUrl}/contact-pages?populate=*`, {
      headers: {
        Authorization: `Bearer ${getStrapiAuthToken()}`,
      },
      next: { revalidate: 3600 }, // ✅ Next.js caching layer
    });

    if (!res.ok) {
      throw new Error(`Strapi API failed: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({
    data: data.data,
    from: "strapi",
    fetchedAt: new Date().toISOString(), // 👈 add this line for debugging
  });
  } catch (err) {
    console.error("Failed to fetch contact page:", err);
    return NextResponse.json(
      { error: "Failed to fetch contact page" },
      { status: 500 }
    );
  }
}
