"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import "../../styles/Features.css";
import { useState, useEffect, useCallback } from "react";
import config from "@/lib/config";
import Image from "next/image";
import { buildImageUrl, getStrapiApiUrl, getEnvVar } from "@/lib/defaults";
import Link from "next/link";
interface Feature {
  id: string;
  name: string;
  title: string;
  description: string;
  list: {
    name: string;
    route: string;
  }[];
  image_url: string;
  route?: string;
  order: number;
}

const CompleteSuiteSection = () => {
  const apiUrl = config.localApi.baseUrl;

  const [suiteFeatures, setSuiteFeatures] = useState<Feature[]>([]);
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchSuiteFeatures = useCallback(async () => {
    setLoadingFeatures(true);

    try {
      const endpoints = "complete-suite-home-pages";
      let data = null;

      const envBaseUrl = getStrapiApiUrl();
      const defaultBaseUrl = apiUrl ? String(apiUrl).replace(/\/$/, "") : envBaseUrl;

      if (!defaultBaseUrl ||
          defaultBaseUrl.includes("undefined") ||
          defaultBaseUrl.includes("ngrok-free.app") ||
          !defaultBaseUrl.startsWith("http")) {
        console.warn("CompleteSuiteSection: invalid API base URL", defaultBaseUrl);
        setSuiteFeatures([]);
        return;
      }

      const buildUrl = (path: string) =>
        `${defaultBaseUrl}/${String(path).replace(/^\//, "")}`;

      const STRAPI_TOKEN = getEnvVar("STRAPI_API_AUTH_TOKEN");
      const finalUrl = buildUrl(endpoints);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (finalUrl.startsWith(envBaseUrl) && STRAPI_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
      }

      try {
        const res = await fetch(finalUrl, { headers });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        data = await res.json();
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }

      const items = data?.data || data?.features || data || [];

      if (Array.isArray(items) && items.length > 0) {
        const mapped: Feature[] = items.map((it, idx: number) => {
          let imageUrl = "";
          if (it.image_url) {
            if (/^https?:\/\//i.test(it.image_url)) {
              imageUrl = it.image_url;
            } else if (it.image_url.startsWith("/")) {
              imageUrl = buildImageUrl(it.image_url.replace(/^\/uploads\//, ""));
            } else {
              imageUrl = buildImageUrl(it.image_url);
            }
          }

          return {
            id: (it.id ?? it.slug ?? it.name ?? `feature-${idx}`).toString(),
            name: it.name ?? it.title ?? it.short_title ?? `Feature ${idx + 1}`,
            title: it.title ?? it.name ?? "",
            description: it.description ?? it.excerpt ?? "",
            list: Array.isArray(it.list)
              ? it.list
              : it.bullets ?? it.features ?? [],
            image_url: imageUrl,
            route:
              it.route ?? it.url ?? (it.slug ? `/feature/${it.slug}` : "/demo"),
            order: it.order ?? idx
          };
        });
        mapped.sort((a, b) => a.order - b.order);
        setSuiteFeatures(mapped);
      } else {
        setSuiteFeatures([]); // no features if API returns empty
      }
    } catch (err) {
      console.error("Failed to fetch suite features:", err);
      setSuiteFeatures([]);
    } finally {
      setLoadingFeatures(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchSuiteFeatures();
  }, [fetchSuiteFeatures]);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            A complete suite to power your practice
          </h2>
          <p className="text-slate-600 text-lg max-w-5xl mx-auto">
            Whether you&apos;re growing or just looking for something better,
            Adit&apos;s all-in-one platform helps your practice work smarter.
            From scheduling and communication to payments and analytics, our
            tools reduce chaos and keep your team focused on care.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {suiteFeatures.length > 0 && (
            <Tabs value={suiteFeatures[activeIndex]?.id} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {suiteFeatures.map((f, i) => (
                  <TabsTrigger
                    key={f.id}
                    value={f.id}
                    className={`feature-tab ${
                      activeIndex === i ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {f.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {suiteFeatures.map((feature) => (
                <TabsContent key={feature.id} value={feature.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.list.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {feature.list.map((item, index) => (
                            <Link
                              key={item.route}
                              href={item.route}
                              className="border-2 border-black-500 rounded-lg px-6 py-4 text-center text-slate-900 font-semibold bg-white hover:bg-teal-50 transition-colors cursor-pointer block"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      <Button
                        variant="link"
                        className="text-orange-500 font-semibold p-0 btn-primary"
                        asChild
                      >
                        <Link href={feature.route ?? "/"}>Read More →</Link>
                      </Button>
                    </div>

                    <div className="flex justify-center md:justify-end">
                      {feature.image_url && (
                        <Image
                          src={feature.image_url}
                          alt={feature.title|| 'Image'}
                          width={420}
                          height={420}
                          className="w-full w-auto h-auto rounded-lg  object-cover"
                          loading="lazy"
                          unoptimized 
                        />
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {loadingFeatures && (
            <p className="text-center text-slate-500">Loading features...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompleteSuiteSection;
