import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryPage from "@/components/GalleryPage";
import { GALLERIES, getGallery } from "@/lib/galleries";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return GALLERIES.map((g) => ({ category: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gallery = getGallery((await params).category);
  return { title: gallery ? `${gallery.name} — Drin Kryeziu` : "Drin Kryeziu" };
}

export default async function Page({ params }: Props) {
  const gallery = getGallery((await params).category);
  if (!gallery) notFound();
  return <GalleryPage gallery={gallery} />;
}
