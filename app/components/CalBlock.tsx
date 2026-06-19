"use client";
import { useEffect } from "react";

export default function CalBlock() {
  useEffect(() => {
    const load = async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi();
      cal("floatingButton", {
        calLink: "webrarium/30min",
        buttonText: "Meet Online",
        buttonColor: "#507a49",
      });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    const onInteract = () => {
      load();
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true, once: true })
    );

    // Fallback: завантажити через 5 сек якщо не було взаємодії
    const t = setTimeout(load, 5000);
    return () => {
      clearTimeout(t);
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, []);
  return <></>;
}
