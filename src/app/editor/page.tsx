import { notFound } from "next/navigation";
import EditorClient from "./EditorClient";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ _pagebuilderToken?: string }>;
}) {
  const { _pagebuilderToken } = await searchParams;

  if (!_pagebuilderToken) return notFound();
console.log("[EditorClient] using config:::::ASDASD");

  return <EditorClient />;
}
