"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useState } from "react";

/** A course remains usable when its provider's image is unavailable. */
export function CourseImage({ src, sizes }: { src: string; sizes: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!src || failedSource === src) return <BookOpen size={36} aria-hidden="true" />;
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      unoptimized={src.startsWith("http")}
      onError={() => setFailedSource(src)}
    />
  );
}
