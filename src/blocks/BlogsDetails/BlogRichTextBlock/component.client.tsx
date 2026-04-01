"use client";
export interface BlogRichTextBlockProps {
  content?: string;
}
export default function BlogRichTextBlock({ content }: BlogRichTextBlockProps) {
  if (!content) return null;

  return (
    <section className="prose max-w-4xl mx-auto py-10 px-6">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}