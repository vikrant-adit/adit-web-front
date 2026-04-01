// /app/contact-us/api/route.ts
import { NextResponse } from "next/server";

export const revalidate = 3600; // ✅ cache for 1 hour

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const res = await fetch(`${apiUrl}contact-pages?populate=*`, {
      headers: {
        Authorization: `Bearer 308642958debddf8a365f6b6b774bb29c67d6f8d02fba571f689c02e3121dec7884c14b2ef695f20355b61cf5fb58ecbc8df13a10bb1b210d67cb50f43c44ac8df7bdf7060ea387471e34851b1da255a47665be6d87858a32b56182ae4a0ded1e814660b8768eddb49d69653658b2780bfcd548a23cc4fd8b1054af907fa6e14`,
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
