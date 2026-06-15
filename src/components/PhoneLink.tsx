import { useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE_DISPLAY = "8-918-505-16-17";
const PHONE_TEL = "+79185051617";

function isMobile() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

interface PhoneLinkProps {
  className?: string;
  style?: React.CSSProperties;
  iconSize?: number;
  showIcon?: boolean;
}

export default function PhoneLink({ className, style, iconSize = 14, showIcon = true }: PhoneLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile()) return;
    e.preventDefault();
    navigator.clipboard?.writeText(PHONE_DISPLAY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <a href={`tel:${PHONE_TEL}`} onClick={handleClick} className={className} style={style}>
      {showIcon && <Icon name={copied ? "Check" : "Phone"} size={iconSize} />}
      {copied ? "Скопировано!" : PHONE_DISPLAY}
    </a>
  );
}
