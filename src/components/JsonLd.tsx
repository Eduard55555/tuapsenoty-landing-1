import { useEffect } from "react";

export default function JsonLd({ id, data }: { id: string; data: object | object[] }) {
  useEffect(() => {
    const elId = `jsonld-${id}`;
    let el = document.getElementById(elId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = elId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(elId)?.remove();
    };
  }, [id, data]);

  return null;
}
