import { useState } from "react";
import Icon from "@/components/ui/icon";

import { useContacts } from "@/content/siteContent";

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
  const PHONE_DISPLAY = useContacts().phone;
  const digits = PHONE_DISPLAY.replace(/\D/g, "");
  const PHONE_TEL = digits.length === 11 && digits.startsWith("8") ? `+7${digits.slice(1)}` : `+${digits}`;

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
