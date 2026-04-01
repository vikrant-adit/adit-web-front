"use client";

export interface BlogSectionBlockProps {
  id?: string;
  title?: string;
  content?: string;
}

export default function BlogSectionBlock({
  id,
  title,
  content,
}: BlogSectionBlockProps) {
  return (
    <section id={id} className="py-10 scroll-mt-24">
      {title && (
        <h2 className="text-2xl font-semibold mb-4">
          {title}
        </h2>
      )}

      {content && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </section>
  );
}