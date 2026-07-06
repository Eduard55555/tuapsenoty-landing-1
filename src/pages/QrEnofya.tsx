import Icon from "@/components/ui/icon";

const TARGET_PATH = "/characters/enofya?from=qr";

export default function QrEnofya() {
  // QR всегда ведёт на боевой домен, чтобы переход засчитывался вне зависимости от того,
  // где открыт генератор (превью или прод)
  const targetUrl = `https://tuapsenoty.ru${TARGET_PATH}`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&margin=20&data=${encodeURIComponent(
    targetUrl,
  )}`;

  const handleDownload = async () => {
    try {
      const res = await fetch(qrSrc);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-enofya.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(qrSrc, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="qr-print-area w-full max-w-md text-center">
        <div className="text-4xl mb-2">🧺</div>
        <h1 className="font-display text-3xl font-bold mb-1" style={{ color: "var(--warm-dark)" }}>
          Енофья
        </h1>
        <p className="font-body text-base mb-6" style={{ color: "var(--bronze)" }}>
          Наведи камеру телефона — и поздоровайся с бабушкой Енофьей
        </p>

        <div
          className="inline-block bg-white rounded-3xl p-5 shadow-xl mb-6"
          style={{ border: "1px solid rgba(184,115,51,0.2)" }}
        >
          <img
            src={qrSrc}
            alt="QR-код на страницу Енофьи"
            className="w-64 h-64 sm:w-72 sm:h-72 mx-auto"
          />
        </div>

        <p className="font-body text-sm mb-8 break-all" style={{ color: "#6B4C35" }}>
          {targetUrl}
        </p>

        <div className="qr-no-print flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.print()}
            className="btn-primary inline-flex justify-center"
            style={{ backgroundColor: "var(--bronze)" }}
          >
            <Icon name="Printer" size={18} />
            Распечатать
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary inline-flex justify-center"
            style={{ background: "linear-gradient(135deg, var(--sea), var(--teal))" }}
          >
            <Icon name="Download" size={18} />
            Скачать картинку
          </button>
        </div>
      </div>
    </div>
  );
}