import type { Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const photos = product.images && product.images.length > 0 ? product.images : [product.image];

  if (photos.length === 1) {
    return (
      <img
        src={photos[0]}
        alt={product.name}
        className="w-full object-contain"
        style={{ maxHeight: "180px", backgroundColor: "#f5f0eb" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-0.5" style={{ backgroundColor: "#f5f0eb" }}>
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${product.name} — фото ${i + 1}`}
          className="w-full object-contain"
          style={{ height: "110px", backgroundColor: "#f5f0eb" }}
        />
      ))}
    </div>
  );
}