import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ILLUSTRATIONS } from "@/components/illustrations/illustrationData";
import IllustrationEnlargedViewer from "@/components/illustrations/IllustrationEnlargedViewer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ILLUSTRATIONS.map((ill) => ({ id: ill.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const ill = ILLUSTRATIONS.find((item) => item.id === id);
  if (!ill) return { title: "Illustration Not Found · Simat Capital" };
  return {
    title: `${ill.name} · Architectural Blueprint · Simat Capital`,
    description: ill.description,
  };
}

export default async function IllustrationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const ill = ILLUSTRATIONS.find((item) => item.id === id);
  if (!ill) notFound();

  return <IllustrationEnlargedViewer illustration={ill} />;
}
