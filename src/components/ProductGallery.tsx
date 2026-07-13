import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const photos = product.images && product.images.length > 0 ? product.images : [product.image];
  const [index, setIndex] = useState(0);
  const total = photos.length;

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div className="relative">
      <img
        src={photos[index]}
        alt={product.name}
        className="w-full object-contain"
        style={{ maxHeight: "180px", backgroundColor: "#f5f0eb" }}
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full shadow-md"
            style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "var(--bronze)" }}
            aria-label="Предыдущее фото"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full shadow-md"
            style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "var(--bronze)" }}
            aria-label="Следующее фото"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === index ? 18 : 7,
                  height: 7,
                  backgroundColor: i === index ? "var(--bronze)" : "rgba(184,115,51,0.4)",
                }}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
