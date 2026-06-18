import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { hitMetrika } from "@/lib/metrika";

export default function MetrikaTracker() {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    hitMetrika(window.location.href);
  }, [location.pathname, location.search]);

  return null;
}
