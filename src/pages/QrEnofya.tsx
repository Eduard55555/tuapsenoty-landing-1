import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const TARGET_URL = "https://tuapsenoty.ru/characters/enofya";

const QrEnofya = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(
      canvasRef.current,
      TARGET_URL,
      {
        errorCorrectionLevel: "H",
        margin: 2,
        width: 1024,
        color: { dark: "#000000", light: "#ffffff" },
      },
      () => {
        if (canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL("image/png"));
        }
      },
    );
  }, []);

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-enofya.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-white">
      <h1 className="text-2xl font-bold text-center">QR-код Енофьи</h1>
      <p className="text-center text-muted-foreground max-w-md">
        Ведёт на страницу Енофьи. Скачай PNG в высоком качестве для печати на
        латуни.
      </p>
      <div className="border rounded-xl p-4 shadow-sm">
        <canvas ref={canvasRef} className="w-64 h-64" />
      </div>
      <Button onClick={handleDownload} size="lg">
        <Icon name="Download" size={20} className="mr-2" />
        Скачать QR-код (PNG)
      </Button>
      <a
        href={TARGET_URL}
        className="text-sm text-blue-600 underline break-all text-center"
      >
        {TARGET_URL}
      </a>
    </div>
  );
};

export default QrEnofya;
