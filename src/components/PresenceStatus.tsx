"use client";

import { useEffect, useState } from "react";

type Presence = {
  online: boolean;
  lastSeen: number | null;
};

function formatLastSeen(timestamp: number | null) {
  if (!timestamp) return "Last seen: unavailable";

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "Last seen: just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Last seen: ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Last seen: ${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Last seen: ${days}d ago`;
  return `Last seen: ${new Date(timestamp).toLocaleDateString()}`;
}

export default function PresenceStatus() {
  const [presence, setPresence] = useState<Presence>({
    online: false,
    lastSeen: null,
  });

  useEffect(() => {
    let active = true;
    let heartbeat: ReturnType<typeof setInterval> | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;

    // Activate owner tracking once on this device using:
    // https://your-domain/#presence-owner=YOUR_PRESENCE_OWNER_TOKEN
    const hash = window.location.hash;
    const activation = hash.match(/(?:^#|&)presence-owner=([^&]+)/);
    if (activation?.[1]) {
      try {
        localStorage.setItem("portfolio-presence-owner", decodeURIComponent(activation[1]));
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch {
        // Storage may be disabled; status will remain visitor-only.
      }
    }

    const ownerToken = () => {
      try {
        return localStorage.getItem("portfolio-presence-owner");
      } catch {
        return null;
      }
    };

    const sendHeartbeat = async () => {
      const token = ownerToken();
      if (!token || document.visibilityState !== "visible") return;

      try {
        await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ownerToken: token }),
          keepalive: true,
        });
      } catch {
        // A temporary network error should not break the portfolio.
      }
    };

    const loadPresence = async () => {
      try {
        const response = await fetch("/api/presence", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as Presence;
        if (active) setPresence(data);
      } catch {
        // Keep the last successfully fetched state.
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void sendHeartbeat();
        void loadPresence();
      }
    };

    void sendHeartbeat();
    void loadPresence();
    heartbeat = setInterval(() => void sendHeartbeat(), 25_000);
    poll = setInterval(() => void loadPresence(), 10_000);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      if (heartbeat) clearInterval(heartbeat);
      if (poll) clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <span
      title={presence.online ? "Arpan is online" : "Last activity from Arpan's device"}
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium tracking-wide backdrop-blur-xl transition-colors ${
        presence.online
          ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-100/90 shadow-[0_0_24px_rgba(52,211,153,0.07)]"
          : "border-white/10 bg-white/[0.035] text-gray-400"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          presence.online ? "bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" : "bg-gray-500"
        }`}
      />
      {presence.online ? "Online now" : formatLastSeen(presence.lastSeen)}
    </span>
  );
}
