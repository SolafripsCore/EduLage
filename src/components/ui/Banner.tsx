"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function Banner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <div className="relative border-b border-line bg-surface px-12 py-2 text-center text-xs text-ink-600">
    Preview build — institution names, marks, programmes, and imagery are illustrative sample data and imply no partnership.
    <button aria-label="Dismiss preview notice" onClick={() => setVisible(false)} className="absolute right-4 top-1.5 rounded p-1 text-ink-400 hover:text-ink-900"><X size={15} /></button>
  </div>;
}
