"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const affirmations = [
  '"My peace is more valuable than maintaining an image of self-sacrifice. Saying \'no\' to others is saying \'yes\' to myself."',
  '"I am allowed to outgrow versions of myself that no longer protect my peace."',
  '"Healing is not linear, and I honor every small step I take toward wholeness."',
  '"I release the need to earn love through suffering. I am enough as I am."',
  '"My boundaries are not walls to keep people out — they are gates to protect my inner sanctuary."',
  '"I deserve relationships that feel like safety, not survival."',
  '"Choosing myself is not selfish — it is essential for my healing journey."',
  '"I am allowed to grieve the relationship I deserved but never received."',
];

export default function MindfulPause() {
  const [breathingState, setBreathingState] = useState<"ready" | "inhale" | "hold1" | "exhale" | "hold2">("ready");
  const [timer, setTimer] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalCycle = 16; // 4+4+4+4

  const getPhaseLabel = () => {
    switch (breathingState) {
      case "ready": return "READY";
      case "inhale": return "BREATHE IN";
      case "hold1": return "HOLD";
      case "exhale": return "BREATHE OUT";
      case "hold2": return "HOLD";
    }
  };

  const getProgress = () => {
    if (breathingState === "ready") return 0;
    const phases = { inhale: 0, hold1: 1, exhale: 2, hold2: 3 };
    const phaseIndex = phases[breathingState];
    const elapsed = phaseIndex * 4 + (4 - timer);
    return (elapsed / totalCycle) * 100;
  };

  const startBreathing = useCallback(() => {
    setIsActive(true);
    setBreathingState("inhale");
    setTimer(4);
  }, []);

  const resetBreathing = useCallback(() => {
    setIsActive(false);
    setBreathingState("ready");
    setTimer(4);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const drawNewAffirmation = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === currentAffirmation && affirmations.length > 1);
    setCurrentAffirmation(newIndex);
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setBreathingState((state) => {
            switch (state) {
              case "inhale": return "hold1";
              case "hold1": return "exhale";
              case "exhale": return "hold2";
              case "hold2": return "inhale";
              default: return "inhale";
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, breathingState]);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (getProgress() / 100) * circumference;

  return (
    <section style={{ backgroundColor: "#0F1729" }}>
      <div
        className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "1000px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(59, 91, 219, 0.2)",
              color: "#93B4FF",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              borderRadius: "9999px",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Mindful Space
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginBottom: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            The &quot;Mindful Pause&quot; Corner
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#94A3B8",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Before your session, take 60 seconds to soothe your nervous system
            and reclaim internal emotional space.
          </p>
        </div>

        {/* Content Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "24px" }}
        >
          {/* Breathing Guide */}
          <div
            style={{
              backgroundColor: "#1A2332",
              borderRadius: "16px",
              border: "1px solid #2D3A4A",
              textAlign: "center",
            }}
            className="p-8 sm:p-10"
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              4-4-4 Box Breathing Guide
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#94A3B8",
                lineHeight: 1.5,
                marginBottom: "36px",
              }}
            >
              Activates the parasympathetic vagal nerve to reduce heart rate
              and stress.
            </p>

            {/* Circular Timer */}
            <div
              style={{
                position: "relative",
                width: "140px",
                height: "140px",
                margin: "0 auto 36px",
              }}
            >
              {/* Outer dashed circle */}
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx="70"
                  cy="70"
                  r="66"
                  fill="none"
                  stroke="#2D3A4A"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="58"
                  fill="none"
                  stroke="#3B5BDB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>

              {/* Inner circle with text */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: breathingState === "inhale"
                    ? "translate(-50%, -50%) scale(1.08)"
                    : breathingState === "exhale"
                    ? "translate(-50%, -50%) scale(0.95)"
                    : "translate(-50%, -50%) scale(1)",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: breathingState === "ready"
                    ? "linear-gradient(135deg, #3B5BDB 0%, #6B8AFF 100%)"
                    : breathingState === "inhale" || breathingState === "hold1"
                    ? "linear-gradient(135deg, #3B5BDB 0%, #6B8AFF 100%)"
                    : "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.05em",
                    marginBottom: "2px",
                  }}
                >
                  {getPhaseLabel()}
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  {timer}s
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center" style={{ gap: "12px" }}>
              <button
                onClick={startBreathing}
                disabled={isActive}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "#94A3B8" : "#FFFFFF",
                  backgroundColor: isActive ? "#2D3A4A" : "#3B5BDB",
                  border: "none",
                  borderRadius: "9999px",
                  cursor: isActive ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                }}
              >
                Start Breathing Exercise
              </button>
              <button
                onClick={resetBreathing}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  backgroundColor: "transparent",
                  border: "1px solid #3D4F65",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Affirmation Card */}
          <div
            style={{
              backgroundColor: "#1A2332",
              borderRadius: "16px",
              border: "1px solid #2D3A4A",
              display: "flex",
              flexDirection: "column",
            }}
            className="p-8 sm:p-10"
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#94A3B8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Daily Boundary & Self-Love Affirmation
            </p>

            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#E2E8F0",
                lineHeight: 1.7,
                marginBottom: "auto",
              }}
            >
              {affirmations[currentAffirmation]}
            </p>

            <div style={{ marginTop: "36px" }}>
              <button
                onClick={drawNewAffirmation}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  backgroundColor: "transparent",
                  border: "1px solid #3D4F65",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Draw New Affirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
