"use client";

import { useState, useEffect } from "react";

export type QualityMode = "auto" | "high" | "medium" | "low";
export type EffectiveConnectionType = "4g" | "3g" | "2g" | "slow-2g" | "unknown";

export interface NetworkSpeedState {
  effectiveType: EffectiveConnectionType;
  downlink: number | null; // Mbps
  rtt: number | null; // ms
  saveData: boolean;
  autoQuality: "high" | "medium" | "low";
  currentQuality: "high" | "medium" | "low";
  selectedMode: QualityMode;
  setSelectedMode: (mode: QualityMode) => void;
  networkBadgeLabel: string;
}

interface NetworkInformation extends EventTarget {
  effectiveType?: EffectiveConnectionType;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}

export function useNetworkSpeed(): NetworkSpeedState {
  const [effectiveType, setEffectiveType] = useState<EffectiveConnectionType>("unknown");
  const [downlink, setDownlink] = useState<number | null>(null);
  const [rtt, setRtt] = useState<number | null>(null);
  const [saveData, setSaveData] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<QualityMode>("auto");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      connection?: NetworkInformation;
      mozConnection?: NetworkInformation;
      webkitConnection?: NetworkInformation;
    };

    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

    const updateConnectionInfo = () => {
      if (!conn) {
        setEffectiveType("4g"); // default fallback assumes good connection if API missing
        return;
      }

      setEffectiveType(conn.effectiveType || "4g");
      setDownlink(typeof conn.downlink === "number" ? conn.downlink : null);
      setRtt(typeof conn.rtt === "number" ? conn.rtt : null);
      setSaveData(!!conn.saveData);
    };

    updateConnectionInfo();

    if (conn) {
      conn.addEventListener("change", updateConnectionInfo);
      return () => conn.removeEventListener("change", updateConnectionInfo);
    }
  }, []);

  // Determine auto quality based on connection parameters
  const calculateAutoQuality = (): "high" | "medium" | "low" => {
    if (saveData) return "low";
    if (effectiveType === "slow-2g" || effectiveType === "2g") return "low";
    if (effectiveType === "3g") return "medium";
    if (downlink !== null) {
      if (downlink < 1.5) return "low";
      if (downlink < 4.5) return "medium";
      return "high";
    }
    return "high";
  };

  const autoQuality = calculateAutoQuality();
  const currentQuality = selectedMode === "auto" ? autoQuality : selectedMode;

  const getBadgeLabel = () => {
    if (selectedMode !== "auto") {
      if (selectedMode === "high") return "Manual: HD High Resolution";
      if (selectedMode === "medium") return "Manual: Medium Resolution";
      return "Manual: Data Saver (Low Bandwidth)";
    }
    if (currentQuality === "high") return `Adaptive: 4G HD (${downlink ? downlink + " Mbps" : "Fast"})`;
    if (currentQuality === "medium") return `Adaptive: 3G Medium (${downlink ? downlink + " Mbps" : "Balanced"})`;
    return `Adaptive: Data Saver Mode (${effectiveType.toUpperCase()})`;
  };

  return {
    effectiveType,
    downlink,
    rtt,
    saveData,
    autoQuality,
    currentQuality,
    selectedMode,
    setSelectedMode,
    networkBadgeLabel: getBadgeLabel(),
  };
}
